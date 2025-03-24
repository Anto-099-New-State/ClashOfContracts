import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NextResponse } from "next/server";

const llm = new ChatGoogleGenerativeAI({
  temperature: 0.7,
  model: "gemini-1.5-pro-latest",
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.userMessage) {
      return NextResponse.json({ error: "Missing userMessage" }, { status: 400 });
    }

    const userMessage = body.userMessage;

    // 🚀 Enforce strict JSON response
    const aiResponse = await llm.invoke(`
      Extract the troop types and amounts from this command: "${userMessage}". 
      Return only valid JSON, in this exact format:
      {
        "troopTypes": ["barb", "archer"],
        "troopAmounts": [10, 5]
      }

      Rules:
      - Do NOT include any explanations, text, or markdown (e.g., \`\`\`json or \`\`\`).
      - If the command is invalid, return: { "troopTypes": [], "troopAmounts": [] }
    `);

    if (!aiResponse || !aiResponse.content) {
      return NextResponse.json({ error: "Invalid AI response" }, { status: 500 });
    }

    // ✅ Parse AI response safely (removing any accidental text)
    let responseData;
    try {
      const cleanResponse = aiResponse.content.trim().replace(/```json|```/g, "").trim();
      responseData = JSON.parse(cleanResponse);
    } catch (error) {
      console.error("❌ AI Response Parse Error:", error, "Response:", aiResponse.content);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    // ✅ Validate AI output structure
    if (
      Array.isArray(responseData.troopTypes) &&
      Array.isArray(responseData.troopAmounts) &&
      responseData.troopTypes.length === responseData.troopAmounts.length
    ) {
      console.log("🚀 Sending request to backend:", process.env.NEXT_PUBLIC_BACKEND_URL);
      console.log("🛠️ Request payload:", JSON.stringify({
        troopTypes: responseData.troopTypes,
        troopAmounts: responseData.troopAmounts,
        user: process.env.APTOS_ADDRESS
      }));

      const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/train-troops`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          troopTypes: responseData.troopTypes,
          troopAmounts: responseData.troopAmounts,
          user: process.env.APTOS_ADDRESS
        }),
      });

      console.log("🔍 Backend response status:", backendResponse.status);

      if (!backendResponse.ok) {
        const errorText = await backendResponse.text();
        console.error("❌ Backend Error:", errorText);
        return NextResponse.json({ error: "Backend request failed", details: errorText }, { status: 500 });
      }

      const result = await backendResponse.json();
      return NextResponse.json({ message: result.message, txHash: result.txHash });
    }

    return NextResponse.json({ error: "Invalid action or empty troop data" });
  } catch (error) {
    console.error("❌ Internal Server Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
