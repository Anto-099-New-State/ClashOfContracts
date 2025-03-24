"use client";
import { useState } from "react";
import Image from "next/image";
import "../style/ai.css";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // Available game actions with AI-compatible messages
  const gameActions = {
    "Train Troops": "Train me 10 barb, 5 archer",
    "Buy Potions": "Buy 3 health potions",
    "Upgrade Defenses": "Upgrade my castle walls",
  };

  // Send request to AI Assistant API
  const handleUserAction = async (actionKey) => {
    setLoading(true);
    const userMessage = gameActions[actionKey]; // Get predefined AI command

    setChat((prevChat) => [...prevChat, `👤 You: ${userMessage}`]);

    try {
      // ✅ Use the correct API route `/api/game-agent`
      const response = await fetch("/api/game-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage }), // ✅ Send user message correctly
      });

      const data = await response.json();

      if (data.error) {
        setChat((prevChat) => [...prevChat, `⚠️ AI Error: ${data.error}`]);
      } else {
        setChat((prevChat) => [...prevChat, `🤖 AI: ${data.message}`]);
      }
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
                {action}
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
