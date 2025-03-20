"use client"
import { useState } from "react";
import Image from "next/image";
import "../style/barracks.css"

export default function Barracks({ onTrainTroops }) {
  const [isOpen, setIsOpen] = useState(false);
  const [barracksLevel, setBarracksLevel] = useState(1);
  const [housingSpace, setHousingSpace] = useState(30);
  const [trainedTroops, setTrainedTroops] = useState([]);

  const troops = [
    { name: "Barbarian", space: 5, img: "/assets/barb.png" },
    { name: "Archer", space: 3, img: "/assets/archer.png" },
    { name: "Hogrider", space: 10, img: "/assets/hogrider.png" },
    { name: "Wizard", space: 8, img: "/assets/wizard.png" },
    { name: "bowler", space: 20, img: "/assets/bowler.png" },
  ];

  // Train Troop
  const trainTroop = (troop) => {
    const totalSpace = trainedTroops.reduce((sum, t) => sum + t.space, 0);
    if (totalSpace + troop.space <= housingSpace) {
      setTrainedTroops([...trainedTroops, troop]);
      onTrainTroops(troop);
    } else {
      alert("Not enough housing space!");
    }
  };

  // Upgrade Barracks
  const upgradeBarracks = () => {
    setBarracksLevel(barracksLevel + 1);
    setHousingSpace(housingSpace + 10);
  };

  return (
    <div className="barracks">
      {/* Barracks Button */}
      <button className="barracks-btn" onClick={() => setIsOpen(!isOpen)}>
        <Image src="/assets/barracks.png" alt="Barracks" width={150} height={150} />
      </button>

      {/* Barracks Menu */}
      {isOpen && (
        <div className="barracks-popup" onClick={(e) => e.stopPropagation()}>
          <h3>🏰 Barracks (Level {barracksLevel})</h3>
          <p>Housing Space: {housingSpace - trainedTroops.reduce((sum, t) => sum + t.space, 0)} / {housingSpace}</p>

          {/* Troop Carousel (Flex Row) */}
          <div className="troops-carousel">
            {troops.map((troop, index) => (
              <div key={index} className="troop-card">
                <Image src={troop.img} alt={troop.name} width={60} height={60} />
                <p>{troop.name}</p>
                <button onClick={() => trainTroop(troop)}>Train</button>
              </div>
            ))}
          </div>

          <button className="upgrade-btn" onClick={upgradeBarracks}>Upgrade Barracks</button>
        </div>
      )}
    </div>
  );
}
