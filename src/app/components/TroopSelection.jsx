"use client"
import { useState } from "react";
import Image from "next/image";

export default function TroopSelection({ onDeploy }) {
  const troopTypes = [
    { id: 1, name: "Barbarian", img: "/assets/barbarian.png" },
    { id: 2, name: "Archer", img: "/assets/archer.png" },
    { id: 3, name: "Giant", img: "/assets/giant.png" }
  ];

  const [selectedTroops, setSelectedTroops] = useState([]);

  // Add a troop to the slots
  const addTroop = (troop) => {
    if (selectedTroops.length < 5) { // Limit to 5 slots
      setSelectedTroops([...selectedTroops, troop]);
    }
  };

  // Deploy troops (clear slots)
  const deployTroops = () => {
    onDeploy(selectedTroops);
    setSelectedTroops([]); // Clear slots after deploying
  };

  return (
    <div className="troop-selection">
      <h2>Select Your Troops</h2>
      
      {/* Troop Choices */}
      <div className="troop-options">
        {troopTypes.map((troop) => (
          <div key={troop.id} className="troop-card" onClick={() => addTroop(troop)}>
            <Image src={troop.img} alt={troop.name} width={50} height={50} />
            <p>{troop.name}</p>
          </div>
        ))}
      </div>

      {/* Troop Slots */}
      <div className="troop-slots">
        {selectedTroops.map((troop, index) => (
          <Image key={index} src={troop.img} alt={troop.name} width={50} height={50} />
        ))}
      </div>

      {/* Deploy Button */}
      <button className="deploy-button" onClick={deployTroops} disabled={selectedTroops.length === 0}>
        Deploy Troops
      </button>
    </div>
  );
}
