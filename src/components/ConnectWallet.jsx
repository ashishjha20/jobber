import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas instead of QRCode
import './ConnectWallet.css'; // Custom styles for the pop-up

const ConnectWallet = () => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [qrUrl, setQrUrl] = useState('');
  const [walletAddress, setWalletAddress] = useState(null); // To store the wallet address
  const [balance, setBalance] = useState(null); // To store the wallet balance
  const [error, setError] = useState(''); // To store any error messages

  // Wallet download links
  const walletLinks = {
    metamask: 'https://metamask.io/download.html',
    tokenPocket: 'https://www.tokenpocket.pro/en/download/app',
    walletConnect: 'https://walletconnect.com/',
  };

  // Function to set the selected wallet and generate QR code
  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    setQrUrl(walletLinks[wallet]);
  };

  // Function to connect MetaMask wallet
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        // Request wallet connection
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setWalletAddress(account);

        // Fetch the balance in Ether (ETH)
        const balanceInWei = await web3.eth.getBalance(account);
        const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
        setBalance(balanceInEth);
      } catch (err) {
        setError('Failed to connect MetaMask or fetch balance');
      }
    } else {
      setError('MetaMask is not installed');
    }
  };

  useEffect(() => {
    if (selectedWallet === 'metamask') {
      connectMetaMask();
    }
  }, [selectedWallet]);

  return (
    <div>
      {!selectedWallet ? (
        <div id="walletModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            {/* <span
              className="close"
              onClick={() => document.getElementById('walletModal').style.display = 'none'}
            >
              &times;
            </span> */}
            <h2 className="text-xl font-bold mb-4">Connect a Wallet</h2>

            <div className="wallet-options">
              <button
                className="wallet-btn metamask-btn"
                onClick={() => handleWalletSelect('metamask')}
              >
                MetaMask
              </button>
              <button
                className="wallet-btn tokenpocket-btn"
                onClick={() => handleWalletSelect('tokenPocket')}
              >
                TokenPocket
              </button>
              <button
                className="wallet-btn walletconnect-btn"
                onClick={() => handleWalletSelect('walletConnect')}
              >
                WalletConnect
              </button>
            </div>
          </div>
        </div>
      ) : selectedWallet === 'metamask' && walletAddress ? (
        <div>
          <h3 className="text-lg font-bold mb-2">Connected MetaMask Wallet:</h3>
          <p><strong>Address:</strong> {walletAddress}</p>
          <p><strong>Balance:</strong> {balance} ETH</p>
          <button
            onClick={() => {
              setSelectedWallet(null);
              setQrUrl('');
              setWalletAddress(null);
              setBalance(null);
            }}
            className="bg-red-500 text-white py-2 px-4 rounded mt-4"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div id='fuck'>
          <h3 className="text-lg font-bold mb-2">Scan the QR code to download {selectedWallet}:</h3>
          <QRCodeCanvas value={qrUrl} size={256} />

          <button
            onClick={() => {
              setSelectedWallet(null);
              setQrUrl('');
            }}
            className="bg-red-500 text-white py-2 px-4 rounded mt-4 aadibt"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;