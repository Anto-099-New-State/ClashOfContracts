import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";

// ✅ Initialize Aptos SDK with Devnet
const aptosConfig = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(aptosConfig);

// ✅ Hardcoded sender address (replace with your actual address)
const senderAddress = "0x6077c1100fc0e5adf8e812dc576040f0af8cb1158a7a1a0626adb9c831f46a8b";

// ❌ Private key removed
// const PRIVATE_KEY = "REDACTED";
// const senderAccount = Account.fromPrivateKey({
//     privateKey: Uint8Array.from(Buffer.from(PRIVATE_KEY.replace(/^0x/, ""), "hex"))
// });

export async function trainTroops(troopType, troopCount) {
    try {
        console.log(`📌 Training troops: ${troopType} ${troopCount}`);
        console.log("📌 Using sender address:", senderAddress);

        const payload = {
            function: "0x6077c1100fc0e5adf8e812dc576040f0af8cb1158a7a1a0626adb9c831f46a8b::game_agent::train_troops",
            type_arguments: [],
            arguments: [troopType, troopCount],
        };

        console.log("📌 Checking payload:", payload);

        // ✅ Build the transaction
        const transaction = await aptos.transaction.build.simple({
            sender: senderAddress,
            data: payload,
        });

        console.log("📌 Transaction built:", transaction);

        // ✅ Sign the transaction (Requires signer)
        const signedTransaction = await aptos.transaction.sign({
            signer: senderAccount, // ❌ This will fail unless `senderAccount` is defined
            transaction,
        });

        console.log("📌 Signed transaction:", signedTransaction);

        // ✅ Submit the signed transaction
        const response = await aptos.transaction.submit(signedTransaction);
        console.log("✅ Transaction submitted:", response);

        return response;
    } catch (error) {
        console.error("❌ Train Troops Error:", error);
        throw new Error("Failed to train troops.");
    }
}
