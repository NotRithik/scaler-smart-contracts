import React, { useState, useEffect } from 'react';
import { Vote, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { Candidate, Web3State } from '../types';

interface VotingSectionProps {
  web3State: Web3State;
}

export function VotingSection({ web3State }: VotingSectionProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      if (!web3State.contract) return;
      
      try {
        const count = await web3State.contract.candidatesCount();
        const candidatesData = [];
        
        for (let i = 1; i <= count; i++) {
          const candidate = await web3State.contract.candidates(i);
          candidatesData.push({
            id: Number(candidate.id),
            name: candidate.name,
            voteCount: Number(candidate.voteCount)
          });
        }
        
        setCandidates(candidatesData);
        
        if (web3State.address) {
          const voter = await web3State.contract.voters(web3State.address);
          setHasVoted(voter.hasVoted);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
        toast.error('Failed to load candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [web3State.contract, web3State.address]);

  const handleVote = async (candidateId: number) => {
    try {
      const tx = await web3State.contract.vote(candidateId);
      await tx.wait();
      setHasVoted(true);
      toast.success('Vote cast successfully!');
      
      // Refresh candidates
      const candidate = await web3State.contract.candidates(candidateId);
      setCandidates(prev => 
        prev.map(c => 
          c.id === candidateId 
            ? { ...c, voteCount: Number(candidate.voteCount) }
            : c
        )
      );
    } catch (error) {
      toast.error('Failed to cast vote');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-blue-600" size={24} />
              <h3 className="text-xl font-semibold">{candidate.name}</h3>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-gray-600">
                Votes: {candidate.voteCount}
              </span>
              {!hasVoted && (
                <button
                  onClick={() => handleVote(candidate.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Vote size={20} />
                  Vote
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {hasVoted && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-md text-green-700">
          You have already cast your vote. Thank you for participating!
        </div>
      )}
      
      {candidates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No candidates have been added yet.
        </div>
      )}
    </div>
  );
}