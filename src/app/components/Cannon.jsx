import { useState } from "react";
import Image from "next/image";

export default function Cannon({ spendGold }) {
  const [level, setLevel] = useState(1);
  const [upgradeCost, setUpgradeCost] = useState(200);
  const [showUpgradeCard, setShowUpgradeCard] = useState(false);

  const upgrade = () => {
    spendGold(upgradeCost, () => {
      setLevel(level + 1);
      setUpgradeCost(Math.ceil(upgradeCost * 1.5));
      setShowUpgradeCard(false); // Close after upgrade
    });
  };

  return (
    <div className="defense-container cannon">
      {/* Clickable Cannon Image */}
      <button className="cannon-btn"  onClick={() => setShowUpgradeCard(true)}>
        <Image src="/assets/cannon.png" alt="Cannon" width={80} height={80} />
        <Image src="/assets/elixerstorage.png"  alt="Cannon" width={80} height={80} />

      </button>
      
      

      <button  className="cannon-btn"  onClick={() => setShowUpgradeCard(true)}>
        <Image src="/assets/cannon.png" className="defense-container cannon2" alt="Cannon" width={80} height={80} />
        <Image src="/assets/elixerstorage.png"  alt="Cannon" width={80} height={80} />

      </button>

      {/* Small Upgrade Card */}
      {showUpgradeCard && (
        <div className="small-upgrade-card" onClick={(e) => e.stopPropagation()}>
          <p className="upgrade-title">Cannon Lv. {level}</p>
          <p className="upgrade-cost">💰 {upgradeCost} Gold</p>
          <button className="upgrade-btn" onClick={upgrade}>Upgrade</button>
          <button className="close-btn" onClick={() => setShowUpgradeCard(false)}>✖</button>
        </div>
      )}
    </div>
  );
}
