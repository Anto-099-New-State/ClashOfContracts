import { useState } from "react";
import Image from "next/image";
import "../style/def.css";


export default function Tesla({ spendGold }) {
  const [level, setLevel] = useState(1);
  const [upgradeCost, setUpgradeCost] = useState(300);
  const [showUpgradeCard, setShowUpgradeCard] = useState(false);

  const upgrade = () => {
    spendGold(upgradeCost, () => {
      setLevel(level + 1);
      setUpgradeCost(Math.ceil(upgradeCost * 1.4));
    });
  };

  return (
    <div className="defense-container tesla">
<button className="cannon-btn"  onClick={() => setShowUpgradeCard(true)}>
        <Image src="/assets/tesla.gif" alt="Tesla" width={80} height={80} />
      </button>      
 {/* Upgrade Card (Shows only when clicked) */}
 {showUpgradeCard && (
        <div className="small-upgrade-card" onClick={(e) => e.stopPropagation()}>
          <p className="upgrade-title">Hidden Tesla Lv. {level}</p>
          <p className="upgrade-cost">💰 {upgradeCost} Gold</p>
          <button className="upgrade-btn" onClick={upgrade}>Upgrade</button>
          <button className="close-btn" onClick={() => setShowUpgradeCard(false)}>✖</button>
        </div>
      )}   </div>
  );
}
