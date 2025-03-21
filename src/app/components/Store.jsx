"use client";
import { useState } from "react";
import Image from "next/image";
import "../style/store.css";

export default function Store({ gold, elixir, updateResources }) {
  const [isOpen, setIsOpen] = useState(false);

  const potions = [
    { name: "Healing Potion", cost: 100, img: "/assets/healing_potion.png" },
    { name: "Rage Potion", cost: 150, img: "/assets/rage_potion.png" },
    { name: "Freeze Potion", cost: 200, img: "/assets/freeze_potion.png" },
    { name: "Invisibility Potion", cost: 250, img: "/assets/invisibility_potion.png" },
  ];

  const buyPotion = (potion) => {
    if (gold >= potion.cost) {
      updateResources(gold - potion.cost, elixir);
      alert(`${potion.name} purchased!`);
    } else {
      alert("Not enough gold!");
    }
  };

  return (
    <div className="store-container">
      {/* Open Store Button */}
      <button className="store-btn" onClick={() => setIsOpen(true)}>
        <Image src="/assets/store.png" alt="Store" width={80} height={80} />
      </button>

      {/* Store Modal */}
      {isOpen && (
        <div className="store-modal">
          <div className="store-content">
            <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
            <h2>🛒 Store - Buy Potions</h2>
            <p>Gold: {gold} | Elixir: {elixir}</p>

            {/* Potion Carousel */}
            <div className="potions-carousel">
              {potions.map((potion, index) => (
                <div key={index} className="potion-card">
                  <Image src={potion.img} alt={potion.name} width={80} height={80} />
                  <p>{potion.name}</p>
                  <p>Cost: {potion.cost} Gold</p>
                  <button onClick={() => buyPotion(potion)}>Buy</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
