"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider, useWallet } from "@aptos-labs/wallet-adapter-react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const wallets = [new PetraWallet()];

  return (
    <AptosWalletAdapterProvider plugins={wallets}>
      <WalletContextProvider>{children}</WalletContextProvider>
    </AptosWalletAdapterProvider>
  );
}
export function WalletContextProvider({ children }) {
  const { account, connect, disconnect, connected } = useWallet();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!account?.address) {
      localStorage.removeItem("wallet_connected");
    }
  }, [account]);
  async function handleConnect() {
    try {
      const result = await connect("Petra");
      console.log("Wallet Connected:", result);
      localStorage.setItem("wallet_connected", "true"); 
    } catch (error) {
      console.error("Wallet Connection Failed:", error);
    }
  }
  async function handleDisconnect() {
    await disconnect();
    localStorage.removeItem("wallet_connected"); 
    setShowDropdown(false);
  }

  return (
    <WalletContext.Provider value={{ account, connect: handleConnect, disconnect: handleDisconnect, showDropdown, setShowDropdown, connected }}>
      {children}
    </WalletContext.Provider>
  );
}
export function useWalletContext() {
  return useContext(WalletContext);
}