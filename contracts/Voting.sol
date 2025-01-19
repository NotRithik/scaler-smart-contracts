// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "zokrates_voting/verifier.sol";

contract Voting is Verifier {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        bool hasVoted;
        uint vote;
    }

    address public admin;
    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;
    uint public candidatesCount;

    uint public votingStartTime;
    uint public votingEndTime;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    modifier duringVoting() {
        require(block.timestamp >= votingStartTime, "Voting has not started yet");
        require(block.timestamp <= votingEndTime, "Voting has ended");
        _;
    }

    modifier votingNotStarted() {
        require(block.timestamp < votingStartTime, "Voting already started");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addCandidate(string memory name) public onlyAdmin votingNotStarted {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
    }

    function setVotingTimes(uint _startTime, uint _endTime) public onlyAdmin votingNotStarted {
        require(_startTime > block.timestamp, "Start time must be in the future");
        require(_endTime > _startTime, "End time must be after start time");
        votingStartTime = _startTime;
        votingEndTime = _endTime;
    }

    function voteWithProof(
        uint candidateId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[1] memory input
    ) public duringVoting {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate");

        // Create the proof struct
        Proof memory proof;
        proof.a = Pairing.G1Point(a[0], a[1]);
        proof.b = Pairing.G2Point([b[0][0], b[0][1]], [b[1][0], b[1][1]]);
        proof.c = Pairing.G1Point(c[0], c[1]);

        // Verify the proof
        uint256[] memory inputArray = new uint256[](1);
        inputArray[0] = input[0];
        require(verify(inputArray, proof) == 0, "Invalid proof");

        // Register the vote
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].vote = candidateId;
        candidates[candidateId].voteCount++;
    }

    function getCandidate(uint id) public view returns (Candidate memory) {
        return candidates[id];
    }

    function getVotingStatus() public view returns (string memory) {
        if (block.timestamp < votingStartTime) {
            return "Voting has not started yet";
        } else if (block.timestamp > votingEndTime) {
            return "Voting has ended";
        } else {
            return "Voting is ongoing";
        }
    }

    // New function for real-time vote tally
    function getVoteTally() public view returns (Candidate[] memory) {
        Candidate[] memory candidateList = new Candidate[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            candidateList[i - 1] = candidates[i];
        }
        return candidateList;
    }
}
