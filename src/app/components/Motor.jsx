import { useState } from "react";
import Image from "next/image";
import "../style/def.css";


export default function Mortar({ spendGold }) {
  const [level, setLevel] = useState(1);
  const [upgradeCost, setUpgradeCost] =  useState(400);
  const [showUpgradeCard, setShowUpgradeCard] = useState(false);

  const upgrade = () => {
    spendGold(upgradeCost, () => {
      setLevel(level + 1);
      setUpgradeCost(Math.ceil(upgradeCost * 1.6));
    });
  };

  return (
    <div className="defense-container mortar">
<button className="cannon-btn"  onClick={() => setShowUpgradeCard(true)}>
        <Image src="/assets/motor.gif" alt="Motor" width={80} height={80} />
      </button>   
      <button className="cannon-btn"  onClick={() => setShowUpgradeCard(true)}>
        <Image src="/assets/motor.gif" className="defense-container mortar2" alt="Motor" width={80} height={80} />
      </button>    
 {/* Upgrade Card (Shows only when clicked) */}
 {showUpgradeCard && (
        <div className="small-upgrade-card" onClick={(e) => e.stopPropagation()}>
          <p className="upgrade-title">Motor Lv. {level}</p>
          <p className="upgrade-cost">💰 {upgradeCost} Gold</p>
          <button className="upgrade-btn" onClick={upgrade}>Upgrade</button>
          <button className="close-btn" onClick={() => setShowUpgradeCard(false)}>✖</button>
        </div>
      )}    </div>
  );
}
