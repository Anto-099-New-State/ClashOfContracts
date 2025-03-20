"use client"
import { useState } from "react";
import Image from "next/image";
import "../style/ai.css";
export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // AI Strategies
  const strategies = [
    "🔥 Rush Attack: Use Barbarians + Archers for fast attacks.",
    "🛡️ Defensive Play: Upgrade walls & cannons first.",
    "💰 Best Store Buy: Gold Mine Level 3 is cost-efficient.",
    "⚔️ Troop Training: Train 5 Giants + 10 Archers for a balanced army."
  ];

  return (
    <div className="ai-assistant">
      {/* AI Assistant Button */}
      <button
        className="assistant-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src="/assets/welcome-g.png" alt="Assistant" width={400} height={400} />
      </button>

      {/* AI Assistant Popup */}
      {isOpen && (
        <div className="assistant-popup" onClick={() => setIsOpen(false)}>
          <h3>📝 AI Battle Assistant</h3>
          <ul>
            {strategies.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
