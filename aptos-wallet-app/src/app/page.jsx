"use client"; 
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";
export default function Home() {
  const { connect, disconnect, account } = useWallet();
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative h-screen">
      <div className="absolute top-[60px] right-10">
        {account ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Connected
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 shadow-lg rounded-md p-3">
                <p className="text-gray-700 text-sm break-words">
                  {account.address ? String(account.address) : "No Address"}
                </p>
                <button
                  onClick={() => {
                    disconnect();
                    setShowDropdown(false);
                  }}
                  className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => connect("Petra")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
