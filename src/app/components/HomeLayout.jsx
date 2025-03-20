"use client"
import { useState } from "react";
import Image from "next/image";
import "../style/homelayout.css"
export default function HomeLayout() {
  const [isTownhallOpen, setIsTownhallOpen] = useState(false);
  const townhallLevel = 5;
  const [gold, setGold] = useState(1000);
  const [elixir, setElixir] = useState(500);

  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const closePopup = () => setIsTownhallOpen(false);

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Strategies List
  const strategies = [
    "🔥 Rush Attack: Use Barbarians + Archers for fast attacks.",
    "🛡️ Defensive Play: Upgrade walls & cannons first.",
    "💰 Best Store Buy: Gold Mine Level 3 is cost-efficient.",
    "⚔️ Troop Training: Train 5 Giants + 10 Archers for a balanced army."
  ];

  return (
    <div className="home-layout">
      <div className="resource-container">
        <div className="resource">
          <Image src="/assets/gold.png" alt="Gold" width={30} height={30} />
          <span>{gold}</span>
        </div>
        <div className="resource">
          <Image src="/assets/elixir.png" alt="Elixir" width={30} height={30} />
          <span>{elixir}</span>
        </div>
      </div>

      <button className="store-button" onClick={() => setIsStoreOpen(!isStoreOpen)}>
        🛒 Store
      </button>

      {isStoreOpen && (
        <div className="store-popup">
          <h2>Store</h2>
          <p>Coming Soon...</p>
          <button onClick={() => setIsStoreOpen(false)}>Close</button>
        </div>
      )}

       <div className="townhall-container">
        <button
          className={`townhall-btn ${isTownhallOpen ? "enlarged" : ""}`}
          onClick={(e) => {
            e.stopPropagation(); 
            setIsTownhallOpen(!isTownhallOpen);
          }}
        >
          <Image src="/assets/townhall.gif" alt="Town Hall" width={100} height={100} />
        </button>

        {isTownhallOpen && (
          <div className="townhall-popup">
            <p className="text-sm ">Town Hall Level: {townhallLevel}</p>
            <p className="text-sm flex items-center gap-2">
  <Image src="/assets/gold.png" alt="Gold" width={20} height={20} />
  Gold Storage Level: {gold}
</p>
<p className="text-sm flex items-center gap-2">
  <Image  className="" src="/assets/elixir.png" alt="Elixir" width={20} height={20} />Elixir Storage Level: {elixir}
</p>
          </div>
        )}
        </div>
    </div>
  );
}
