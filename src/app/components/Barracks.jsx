"use client"
import { useState } from "react";
import Image from "next/image";
import "../style/barracks.css"

export default function Barracks({ onTrainTroops }) {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);  const [barracksLevel, setBarracksLevel] = useState(1);
  const [housingSpace, setHousingSpace] = useState(30);
  const [trainedTroops, setTrainedTroops] = useState([]);

  const troops = [
    { name: "Barbarian", space: 5, img: "/assets/barb.png" },
    { name: "Archer", space: 3, img: "/assets/archer.png" },
    { name: "Hogrider", space: 10, img: "/assets/hogrider.png" },
    { name: "Wizard", space: 8, img: "/assets/wizard.png" },
    { name: "bowler", space: 20, img: "/assets/bowler.png" },
  ];

  const trainTroop = async (troop) => {
    const totalSpace = trainedTroops.reduce((sum, t) => sum + t.space, 0);
    if (totalSpace + troop.space <= housingSpace) {
      setTrainedTroops([...trainedTroops, troop]);
  
      try {
        const response = await fetch("/api/train", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "train",
            data: { troopType: troop.name, quantity: 1 },
          }),
        });
  
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
  
        console.log("✅ Training successful:", result.message);
      } catch (error) {
        console.error("❌ Failed to train troop:", error);
      }
    } else {
      alert("Not enough housing space!");
    }
  };
  

  const upgradeBarracks = () => {
    setBarracksLevel(barracksLevel + 1);
    setHousingSpace(housingSpace + 10);
  };

  return (
    <div className="barracks">
            {/* First Barracks */}
            <div className="barracks">
        <button className="barracks-btn" onClick={() => setIsOpen1(!isOpen1)}>
          <Image src="/assets/barracks.png" alt="Barracks 1" width={150} height={150} />
        </button>
        {isOpen1 && <p className="barracks-popup">🏰 Barracks 1 Open</p>}
      </div>

      {isOpen1 && (
        <div className="barracks-popup" onClick={(e) => e.stopPropagation()}>
          <h3>🏰 Barracks (Level {barracksLevel})</h3>
          <p>Housing Space: {housingSpace - trainedTroops.reduce((sum, t) => sum + t.space, 0)} / {housingSpace}</p>

          <div className="troops-carousel">
            {troops.map((troop, index) => (
              <div key={index} className="troop-card">
                <Image src={troop.img} alt={troop.name} width={60} height={60} />
                <p>{troop.name}</p>
                <button onClick={() => trainTroop(troop)}>Train</button>
              </div>
            ))}
          </div>

          <button className="upgrade-btn" onClick={()=>{upgradeBarracks();
           setIsOpen1(false)}}>Upgrade Barracks</button>
        </div>
      )}
         {isOpen2 && (
        <div className="barracks-popup" onClick={(e) => e.stopPropagation()}>
          <h3>🏰 Barracks (Level {barracksLevel})</h3>
          <p>Housing Space: {housingSpace - trainedTroops.reduce((sum, t) => sum + t.space, 0)} / {housingSpace}</p>

          <div className="troops-carousel">
            {troops.map((troop, index) => (
              <div key={index} className="troop-card">
                <Image src={troop.img} alt={troop.name} width={60} height={60} />
                <p>{troop.name}</p>
                <button onClick={() => trainTroop(troop)}>Train</button>
              </div>
            ))}
          </div>

          <button className="upgrade-btn" onClick={()=>{upgradeBarracks();
           setIsOpen2(false)}}>Upgrade Barracks</button>
        </div>
      )}
    </div>
  );
}
