"use client"
import { useState } from "react";
import "../style/battle.css"
import Image from "next/image";
export default function BattleSetup() {

  const [troops, setTroops] = useState([
    { id: 1, x: 100, y: 300 },
    { id: 2, x: 200, y: 350 },
  ]);

  // Move troops when battle starts
  const startBattle = () => {
    setTroops(troops.map(troop => ({ ...troop, x: troop.x + 200 }))); 
  };

  return (
    <div className="battle-container">
      {/* Battle Field */}
      <Image className="game-name" src="/assets/fontcoc.png" alt="Game Font" width={400} height={60} />
      <div className="battlefield">
        {troops.map((troop) => (
          <img
            key={troop.id}
            src="/assets/troop.gif"
            alt="Troop"
            className="troop"
            style={{ left: troop.x, top: troop.y }}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <button onClick={startBattle} className="start-button">
        Start Battle
      </button>
    </div>
  );
}
