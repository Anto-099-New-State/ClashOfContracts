import { aptos } from "@/app/lib/aptos";

export async function trainTroops(troopType, troopCount) {
    try {
      console.log(`📌 Training troops: ${troopType} ${troopCount}`);
  
      // ✅ Hardcoded address (for testing)
      const senderAddress = "0x6077c1100fc0e5adf8e812dc576040f0af8cb1158a7a1a0626adb9c831f46a8b";
      console.log("📌 Using hardcoded sender address:", senderAddress);
  
      // Define the transaction payload
      const payload = {
        function: "0x6077c1100fc0e5adf8e812dc576040f0af8cb1158a7a1a0626adb9c831f46a8b::game_agent::train_troops",
        type_arguments: [],
        arguments: [troopType, troopCount],
      };
  
      console.log("📌 Checking payload:", payload);
  
      // Ensure payload is correctly formatted
      if (!payload.function || !payload.arguments) {
        throw new Error("Payload is not properly formatted.");
      }
  
      // Build the transaction
      const transaction = await aptos.transaction.build.simple({
        sender: senderAddress, // ✅ Use the hardcoded address
        data: payload,
      });
  
      console.log("📌 Transaction built:", transaction);
  
      // Submit the transaction
      const response = await aptos.transaction.submit(transaction);
      console.log("📌 Transaction submitted:", response);
  
      return response;
    } catch (error) {
      console.error("❌ Train Troops Error:", error);
      throw new Error("Failed to train troops.");
    }
  }
  