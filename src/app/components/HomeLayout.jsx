"use client"
import { useState } from "react";
import Image from "next/image";
import "../style/homelayout.css"
export default function HomeLayout() {
  // Resource State
  const [gold, setGold] = useState(1000);
  const [elixir, setElixir] = useState(500);

  // Store State
  const [isStoreOpen, setIsStoreOpen] = useState(false);

  return (
    <div className="home-layout">
      {/* Gold & Elixir - Top Right */}
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

      {/* Store Button - Bottom Right */}
      <button className="store-button" onClick={() => setIsStoreOpen(!isStoreOpen)}>
        🛒 Store
      </button>

      {/* Store Popup */}
      {isStoreOpen && (
        <div className="store-popup">
          <h2>Store</h2>
          <p>Coming Soon...</p>
          <button onClick={() => setIsStoreOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
