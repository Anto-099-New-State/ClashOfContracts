"use client";
import { useWalletContext } from "../../context/WalletContext";
import "../style/wallet.css";

export default function WalletButton() {
  const { account, connect, disconnect, showDropdown, setShowDropdown, connected } = useWalletContext();
  const walletAddress = account?.address ? String(account.address) : "";

  return (
    <div className="wallet-container">
      {connected && walletAddress ? (
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="wallet-button"
          >
            Connected
          </button>
          {showDropdown && (
            <div className="wallet-info">
              <p>{walletAddress}</p>
              <div>
                <button
                  onClick={() => {
                    disconnect();
                    setShowDropdown(false);
                  }}
                  className="disconnect-button"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button onClick={connect} className="wallet-button">
          Connect Wallet
        </button>
      )}
    </div>
  );
}