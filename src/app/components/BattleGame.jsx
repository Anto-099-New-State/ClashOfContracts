"use client";
import React, { useState, useEffect } from "react";
import "../style/battle.css"; // Ensure this file exists
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

const initialTroops = [
  { id: 1, name: "Soldier", hp: 100, attack: 20, img: "/assets/bowlerrunning.gif" },
  { id: 2, name: "Archer", hp: 80, attack: 25, img: "/assets/archerrunning.gif" },
  { id: 2, name: "Wizard", hp: 80, attack: 25, img: "/assets/wizardrunning.gif" },
  { id: 2, name: "Barbarian", hp: 80, attack: 25, img: "/assets/barbrunning.gif" },
];

const initialDefenses = [
  { id: 1, name: "Cannon", hp: 150, attack: 15, img: "/assets/cannon.png" },
  { id: 2, name: "Tower", hp: 200, attack: 10, img: "/assets/tesla.png" },
  { id: 2, name: "Motor", hp: 200, attack: 10, img: "/assets/motor.gif" },
  { id: 2, name: "Inferno", hp: 200, attack: 10, img: "/assets/inferno.gif" }

];

const townhallImg = "/assets/townhall.png";

const BattleGame = () => {
    const router = useRouter();

  const [troopSlots, setTroopSlots] = useState([]); // Deployed troops
  const [deployed, setDeployed] = useState(false); // Battle status
  const [troops, setTroops] = useState(initialTroops);
  const [defenses, setDefenses] = useState(initialDefenses);
  const [townHall, setTownHall] = useState({ name: "Town Hall", hp: 300 });

  // Troops can only be placed if battle hasn't started
  const placeTroop = (troop) => {
    if (troopSlots.length < 5 && !deployed) {
      setTroopSlots([...troopSlots, { ...troop, id: Date.now() }]);
    }
  };

  // Start the battle
  const deployTroops = () => {
    if (troopSlots.length === 0) {
      toast.warning("⚠️ Deploy at least one troop!", { position: "top-center" });
      return;
    }
    setDeployed(true);
  };

  // Battle mechanics
  useEffect(() => {
    if (deployed && troopSlots.length > 0) {
      const battleInterval = setInterval(() => {
        setTroopSlots((prevTroops) =>
          prevTroops
            .map((troop) => ({ ...troop, hp: troop.hp - 10 })) // Reduce troop HP
            .filter((troop) => troop.hp > 0) // Remove dead troops
        );

        setDefenses((prevDefenses) =>
          prevDefenses
            .map((def) => ({ ...def, hp: def.hp - 15 })) // Reduce defense HP
            .filter((def) => def.hp > 0) // Remove destroyed defenses
        );

        setTownHall((prevTownHall) => ({
          ...prevTownHall,
          hp: prevTownHall.hp - 5, // Troops attack Town Hall
        }));
      }, 1000);

      return () => clearInterval(battleInterval);
    }
  }, [deployed, troopSlots]);

  // Win/Loss conditions
  useEffect(() => {
    if (townHall.hp <= 0) {
      toast.success("🔥 Strike You! 😊", { position: "top-center" });
      setDeployed(false);
    } else if (troopSlots.length < 1 && defenses.length > 0) {
      toast.error("💀 You Lost! 😢", { position: "top-center" });
      setDeployed(false);
    }
  }, [townHall.hp, troopSlots, defenses]);

  return (
    <div className="battle-container">
     <div className="nav-btn">
      <button onClick={() => window.location.reload()}>🔄️</button>
      <button onClick={() => router.push("/")}>🏠</button>
    </div>
      <h2>Battle Game</h2>

      <ToastContainer /> {/* Required for notifications */}

      <div className="troop-selection">
        {troops.map((troop) => (
          <button key={troop.id} onClick={() => placeTroop(troop)} disabled={deployed}>
            <img src={troop.img} alt={troop.name} className="troop-img" />
            {troop.name}
          </button>
        ))}
      </div>

      <div className="troop-slots">
        {troopSlots.map((troop) => (
          <div key={troop.id} className="troop">
            <img src={troop.img} alt={troop.name} className="troop-img" />
            {troop.name} (HP: {troop.hp})
          </div>
        ))}
      </div>

      <button onClick={deployTroops} disabled={deployed}>Deploy</button>

      <div className="enemy-defenses">
        {defenses.map((def) => (
          <div key={def.id} className="defense">
            <img src={def.img} alt={def.name} className="defense-img" />
            {def.name} (HP: {def.hp})
          </div>
        ))}
      </div>

      <div className="townhall">
        <img src={townhallImg} alt="Town Hall" className="townhall-img" />
        <p>🏰 Town Hall (HP: {townHall.hp})</p>
      </div>
    </div>
  );
};

export default BattleGame;
