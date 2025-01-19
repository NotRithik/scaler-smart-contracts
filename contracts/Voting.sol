// SPDX-License-Identifier: MIT
pragma solidity >=0.8 <0.9;
import "zokrates_voting/verifier.sol";

contract Voting is Verifier{
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

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addCandidate(string memory name) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
    }

    function voteWithProof(
        uint candidateId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[1] memory input
    ) public {
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
}