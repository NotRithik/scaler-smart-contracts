import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Web3State } from '../types';

interface AdminPanelProps {
  web3State: Web3State;
}

export function AdminPanel({ web3State }: AdminPanelProps) {
  const [candidateName, setCandidateName] = useState('');

  const addCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) return;

    try {
      const tx = await web3State.contract.addCandidate(candidateName);
      await tx.wait();
      toast.success(`Added candidate ${candidateName}`);
      setCandidateName('');
    } catch (error) {
      toast.error('Failed to add candidate');
      console.error(error);
    }
  };

  if (!web3State.isAdmin) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <form onSubmit={addCandidate} className="flex gap-4">
        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          placeholder="Enter candidate name"
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={20} />
          Add Candidate
        </button>
      </form>
    </div>
  );
}