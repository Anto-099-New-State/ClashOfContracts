"use client"
import { useState } from "react";
import Image from "next/image";
import "../style/homelayout.css"
import Barracks from "./Barracks";
import Cannon from "./Cannon";
import Inferno from "./Inferno";
import Tesla from "./Tesla";
import Mortar from "./Motor";
import Store from "./Store";
export default function HomeLayout() {
  const [isTownhallOpen, setIsTownhallOpen] = useState(false);
  const townhallLevel = 5;
  const [gold, setGold] = useState(1000);
  const [elixir, setElixir] = useState(500);

  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const closePopup = () => setIsTownhallOpen(false);
   const [trainedTroops, setTrainedTroops] = useState([]);
  
    // Function to handle trained troops
    const handleTrainTroop = (troop) => {
      console.log("Troop trained:", troop);
      setTrainedTroops([...trainedTroops, troop]);
    };
   
    const spendGold = (cost, upgradeFn) => {
      if (gold >= cost) {
        setGold(gold - cost);
        upgradeFn();
      } else {
        alert("Not enough Gold!");
      }
    };  
    const updateResources = (newGold, newElixir) => {
      setGold(newGold);
      setElixir(newElixir);
    };
  
 
  return (
    
    <div className="home-layout">
      <Image src="/assets/fontcoc.png" className="game-name" alt="Game Font" width={200} height={60} />
      <Barracks onTrainTroops={handleTrainTroop}/>
      <Cannon spendGold={spendGold} />
      <Inferno spendGold={spendGold} />
      <Tesla spendGold={spendGold} />
      <Mortar spendGold={spendGold} />
      <div className="resource-container">
        <div className="resource">
          <Image src="/assets/gold.png" alt="Gold" width={30} height={30} />
          <span>{gold}</span>
        </div>
        <div className="resource">
          <Image src="/assets/elixir.png" alt="Elixir" width={30} height={30} />
          <span>{elixir}</span>
        </div>
      </div>

      <button className="store-button" onClick={() => setIsStoreOpen(!isStoreOpen)}>
            <Store gold={gold} elixir={elixir} updateResources={updateResources} />

      </button>

      {isStoreOpen && (
        <div className="store-popup">
          <h2>Store</h2>
          <p>Coming Soon...</p>
          <button onClick={() => setIsStoreOpen(false)}>Close</button>
        </div>
      )}

       <div className="townhall-container">
        <button
          className={`townhall-btn ${isTownhallOpen ? "enlarged" : ""}`}
          onClick={(e) => {
            e.stopPropagation(); 
            setIsTownhallOpen(!isTownhallOpen);
          }}
        >
          <Image src="/assets/townhall.gif" alt="Town Hall" width={180} height={180} />
        </button>

        {isTownhallOpen && (
          <div className="townhall-popup">
            <p className="text-sm ">Town Hall Level: {townhallLevel}</p>
            <p className="text-sm flex items-center gap-2">
  <Image src="/assets/gold.png" alt="Gold" width={20} height={20} />
  Gold Storage Level: {gold}
</p>
<p className="text-sm flex items-center gap-2">
  <Image  className="" src="/assets/elixir.png" alt="Elixir" width={20} height={20} />Elixir Storage Level: {elixir}
</p>
          </div>
        )}
        </div>
    </div>
  );
}
