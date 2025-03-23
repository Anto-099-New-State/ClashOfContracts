import { aptos } from "@/lib/aptos"; 

export async function trainTroops(troopType, troopCount) {
    try {
        console.log(`📌 Training troops: ${troopType} ${troopCount}`);

        const senderAddress = "0x6077c1100fc0e5adf8e812dc576040f0af8cb1158a7a1a0626adb9c831f46a8b"; 
        console.log("📌 Using hardcoded sender address:", senderAddress);

        const payload = {
            function: "0x6077c1100fc0e5adf8e812dc576040f0af8cb1158a7a1a0626adb9c831f46a8b::game_agent::train_troops",
            type_arguments: [],
            arguments: [troopType, troopCount],
        };

        console.log("📌 Checking payload:", payload);
        console.log("📌 Checking aptos.transaction:", aptos.transaction);

        if (!aptos.transaction || !aptos.transaction.build) {
            throw new Error("Aptos transaction API is not initialized!");
        }

        const transaction = await aptos.transaction.build.simple({
            sender: senderAddress,
            data: payload,
        });

        console.log("📌 Transaction built:", transaction);

        const response = await aptos.transaction.submit(transaction);
        console.log("✅ Transaction submitted:", response);

        return response;
    } catch (error) {
        console.error("❌ Train Troops Error:", error);
        throw new Error("Failed to train troops.");
    }
}
