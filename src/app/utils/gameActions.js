export async function trainTroops(troopType, troopCount) {
    try {
        // Validate inputs
        if (!troopType || !troopCount) {
            throw new Error("❌ troopType and troopCount are required!");
        }
        
        console.log(`📌 Training troops: ${troopType} ${troopCount}`);
        
        // Get agent with signer and hardcoded address
        const { signer, aptos, address } = await createAgent();
        
        console.log("📌 Using sender address:", address);
        
        // Debug available methods on aptos object
        console.log("📌 Available methods on aptos:", Object.keys(aptos));
        
        // Create the payload
        const payload = {
            function: `${address}::game_agent::train_troops`,
            type_arguments: [],
            arguments: [troopType, parseInt(troopCount)]
        };
        
        console.log("📌 Checking payload:", payload);
        
        try {
            // Build the transaction using transaction.build
            const transaction = await aptos.transaction.build({
                sender: address,
                payload: payload
            });
            
            console.log("📌 Transaction built successfully");
            
            // Sign the transaction
            // Note: This assumes your signer has a signTransaction method
            // If not, you may need to adjust based on your signer's API
            const signedTx = await signer.signTransaction(transaction);
            
            console.log("📌 Transaction signed successfully");
            
            // Submit the signed transaction
            const response = await aptos.transaction.submit(signedTx);
            
            console.log("✅ Transaction submitted:", response);
            return { hash: response.hash || response.txHash, success: true };
            
        } catch (txError) {
            console.error("❌ Transaction submission error:", txError);
            
            // Try alternative method if first approach fails
            if (typeof aptos.transaction.submit === 'function') {
                console.log("📌 Trying direct submission with transaction.submit");
                
                // Some Aptos SDKs allow passing payload directly to submit
                const altResponse = await aptos.transaction.submit({
                    sender: address,
                    payload: payload,
                    signer: signer
                });
                
                console.log("✅ Transaction submitted (alt method):", altResponse);
                return { hash: altResponse.hash || altResponse.txHash, success: true };
            }
            
            throw txError;
        }
    } catch (error) {
        console.error("❌ Train Troops Error:", error);
        throw new Error(`Failed to train troops: ${error.message}`);
    }
}