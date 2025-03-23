"use client";
import { useState } from "react";
import Image from "next/image";
import "../style/store.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AptosClient } from "aptos";

const APTOS_NODE_URL = "https://fullnode.devnet.aptoslabs.com"; 
const client = new AptosClient(APTOS_NODE_URL);

const CONTRACT_ADDRESS = "0x0aa32e527d19ef1065469c3159b6f97941dc6338c9668ad0bd09016bc0fd1b98";
const MODULE_NAME = "store";
const FUNCTION_NAME = "buy_potion"; 

export default function Store({ gold, elixir, updateResources }) {
  const [isOpen, setIsOpen] = useState(false);
  const [wallet, setWallet] = useState(null);

  const potions = [
    { name: "Healing Potion", cost: 100, img: "/assets/healing_potion.png" },
    { name: "Rage Potion", cost: 150, img: "/assets/rage_potion.png" },
    { name: "Freeze Potion", cost: 200, img: "/assets/freeze_potion.png" },
    { name: "Invisibility Potion", cost: 250, img: "/assets/invisibility_potion.png" },
  ];

  const connectWallet = async () => {
    if (window.aptos) {
      try {
        const account = await window.aptos.connect();
        const walletInfo = await window.aptos.account();
        setWallet(walletInfo.address);
      } catch (error) {
        alert("Wallet connection failed!");
      }
    } else {
      alert("Aptos Wallet not found! Install Petra and try again mate!.");
    }
  };

  const buyPotion = async (potion) => {
    if (!wallet) {
      alert("Connect your wallet first!");
      return;
    }
    if (gold < potion.cost) {
      alert("Not enough gold!");
      return;
    }

    try {
      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::${FUNCTION_NAME}`,
        type_arguments: [],
        arguments: [potion.cost],  
      };

      const response = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);
      alert(`${potion.name} purchased successfully! ✅`);

      updateResources(gold - potion.cost, elixir);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed! ❌");
    }
  };

  return (
    <div className="store-container">
      <div className="store-btn" onClick={() => setIsOpen(true)} style={{ cursor: "pointer" }}>
        <AiOutlineShoppingCart size={24} color="black" />
      </div>

      {isOpen && (
        <div className="store-modal">
          <div className="store-content">
            <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
            <h2>🛒 Store - Buy Potions</h2>
            <p>Gold: {gold} | Elixir: {elixir}</p>

            {!wallet ? (
              <button onClick={connectWallet}>🔗 Connect Wallet</button>
            ) : (
              <p>✅ Wallet Connected: {wallet.slice(0, 6)}...{wallet.slice(-4)}</p>
            )}

            <div className="potions-carousel">
              {potions.map((potion, index) => (
                <div key={index} className="potion-card">
                  <Image src={potion.img} alt={potion.name} width={80} height={80} />
                  <p>{potion.name}</p>
                  <p>Cost: {potion.cost} Gold</p>
                  <button onClick={() => buyPotion(potion)}>Buy</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}