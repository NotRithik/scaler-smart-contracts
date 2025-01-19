import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Vote, Wallet } from 'lucide-react';
import { useWeb3 } from './hooks/useWeb3';
import { AdminPanel } from './components/AdminPanel';
import { VotingSection } from './components/VotingSection';

function App() {
  const web3State = useWeb3();

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Vote className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">Decentralized Voting</h1>
            </div>
            {web3State.address ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Connected:</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {`${web3State.address.slice(0, 6)}...${web3State.address.slice(-4)}`}
                </code>
                {web3State.isAdmin && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Admin
                  </span>
                )}
              </div>
            ) : (
              <button
                onClick={web3State.connectWallet}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Wallet size={20} />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!web3State.address ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">
              Please connect your MetaMask wallet to access the voting system.
            </p>
            <button
              onClick={web3State.connectWallet}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Wallet size={20} />
              Connect MetaMask
            </button>
          </div>
        ) : (
          <>
            <AdminPanel web3State={web3State} />
            <VotingSection web3State={web3State} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;