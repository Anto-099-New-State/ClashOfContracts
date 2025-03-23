"use client";
import { useState } from "react";
import Image from "next/image";
import "../style/ai.css";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // Available game actions
  const gameActions = {
    "Train Troops": "🛡️ Train troops by selecting unit types.",
    "Buy Potions": "💊 Buy potions to heal your army.",
    "Upgrade Defenses": "🏰 Upgrade your walls & towers.",
  };

  // Send request to AI Agent API
  const handleUserAction = async (action) => {
    setLoading(true);
    setChat((prevChat) => [...prevChat, `👤 You: ${action}`]);

    try {
      const response = await fetch("/api/game-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();
      setChat((prevChat) => [...prevChat, `🤖 AI: ${data.message}`]);
    } catch (error) {
      setChat((prevChat) => [...prevChat, "⚠️ AI: Error processing request."]);
    }

    setLoading(false);
  };

  return (
    <div className="ai-assistant">
      <button className="assistant-btn" onClick={() => setIsOpen(!isOpen)}>
        <Image src="/assets/welcome-g.png" alt="Assistant" width={350} height={350} />
      </button>

      {isOpen && (
        <div className="assistant-popup">
          <h3>📝 AI Battle Assistant</h3>
          <ul>
            {Object.keys(gameActions).map((action, index) => (
              <li key={index} onClick={() => handleUserAction(action)}>
                {gameActions[action]}
              </li>
            ))}
          </ul>

          {/* Chat Messages */}
          <div className="chat-box">
            {chat.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
            {loading && <p>⏳ Processing...</p>}
          </div>
        </div>
      )}
    </div>
  );
}
