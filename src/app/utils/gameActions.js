import { createAgent } from "../api/game-agent/route";

export async function trainTroops(troopType, troopCount) {
    try {
        // Validate inputs
        if (troopType === undefined || troopCount === undefined) {
            throw new Error("❌ troopType and troopCount are required!");
        }
        
        console.log(`📌 Training troops: ${troopType} ${troopCount}`);
        
        // Get agent with signer and hardcoded address
        const { signer, aptos, address } = await createAgent();
        
        console.log("📌 Using sender address:", address);
        
        // Create the payload with correct types
        // The Move function expects u8 for troopType and u64 for quantity
        const payload = {
            function: `${address}::game_agent::train_troops`,
            type_arguments: [],
            arguments: [
                Number(troopType),     // Make sure it's a number for u8
                BigInt(troopCount)     // Use BigInt for u64 to avoid precision issues
            ]
        };
        
        console.log("📌 Prepared payload:", payload);
        
        // Using the latest Aptos SDK v2.x pattern
        try {
            const transaction = await aptos.transaction.build({
                sender: address,
                data: payload
            });
            
            const signedTx = await signer.sign(transaction);
            const pendingTx = await aptos.transaction.submit(signedTx);
            
            console.log("✅ Transaction submitted:", pendingTx);
            const txResult = await aptos.transaction.waitForTransaction({
                transactionHash: pendingTx.hash
            });
            
            console.log("✅ Transaction confirmed:", txResult);
            return { 
                hash: pendingTx.hash, 
                success: true,
                result: txResult
            };
        } catch (txError) {
            console.error("❌ Transaction failed:", txError);
            throw new Error(`Transaction error: ${txError.message}`);
        }
    } catch (error) {
        console.error("❌ Train Troops Error:", error);
        throw new Error(`Failed to train troops: ${error.message}`);
    }
}