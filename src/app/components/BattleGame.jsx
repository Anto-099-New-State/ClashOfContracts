import React, { useState, useEffect } from "react";
import "./BattleGame.css";

const initialTroops = [
  { id: 1, name: "Soldier", hp: 100, attack: 20 },
  { id: 2, name: "Archer", hp: 80, attack: 25 },
];

const initialDefenses = [
  { id: 1, name: "Cannon", hp: 150, attack: 15 },
  { id: 2, name: "Tower", hp: 200, attack: 10 },
];

const BattleGame = () => {
  const [troopSlots, setTroopSlots] = useState([]);
  const [deployed, setDeployed] = useState(false);
  const [troops, setTroops] = useState(initialTroops);
  const [defenses, setDefenses] = useState(initialDefenses);

  const placeTroop = (troop) => {
    if (troopSlots.length < 5) {
      setTroopSlots([...troopSlots, { ...troop, id: Date.now() }]);
    }
  };

  const deployTroops = () => {
    setDeployed(true);
  };

  useEffect(() => {
    if (deployed && troopSlots.length > 0) {
      const battleInterval = setInterval(() => {
        setTroopSlots((prevTroops) =>
          prevTroops.map((troop) => ({ ...troop, hp: troop.hp - 10 }))
        );
        setDefenses((prevDefenses) =>
          prevDefenses.map((def) => ({ ...def, hp: def.hp - 15 }))
        );
      }, 1000);
      return () => clearInterval(battleInterval);
    }
  }, [deployed]);

  return (
    <div className="battle-container">
      <h2>Battle Game</h2>
      <div className="troop-selection">
        {troops.map((troop) => (
          <button key={troop.id} onClick={() => placeTroop(troop)}>
            {troop.name}
          </button>
        ))}
      </div>
      <div className="troop-slots">
        {troopSlots.map((troop) => (
          <div key={troop.id} className="troop">
            {troop.name} (HP: {troop.hp})
          </div>
        ))}
      </div>
      <button onClick={deployTroops} disabled={deployed}>Deploy</button>
      <div className="enemy-defenses">
        {defenses.map((def) => (
          <div key={def.id} className="defense">
            {def.name} (HP: {def.hp})
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleGame;
