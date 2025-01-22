import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { Web3State } from '../types';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || '';
const contractABI = [
  "function admin() view returns (address)",
  "function addCandidate(string memory name)",
  "function vote(uint candidateId)",
  "function candidates(uint) view returns (uint id, string name, uint voteCount)",
  "function voters(address) view returns (bool hasVoted, uint vote)",
  "function candidatesCount() view returns (uint)"
];

export function useWeb3() {
  const [web3State, setWeb3State] = useState<Web3State>({
    provider: null,
    signer: null,
    contract: null,
    address: '',
    isAdmin: false
  });

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error('Please install MetaMask to use this application');
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      const admin = await contract.admin();
      const isAdmin = admin.toLowerCase() === accounts[0].toLowerCase();

      setWeb3State({
        provider,
        signer,
        contract,
        address: accounts[0],
        isAdmin
      });

      toast.success('Wallet connected successfully!');
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      if (error.code === 4001) {
        toast.error('Please accept the connection request in MetaMask');
      } else {
        toast.error('Failed to connect wallet');
      }
    }
  };

  useEffect(() => {
    // Check if already connected
    if (window.ethereum && window.ethereum.selectedAddress) {
      connectWallet();
    }

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return { ...web3State, connectWallet };
}