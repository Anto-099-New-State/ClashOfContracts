import { Aptos, AptosConfig, Network, PrivateKey } from "@aptos-labs/ts-sdk";
import { LocalSigner } from "move-agent-kit";

const aptosConfig = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(aptosConfig);

// Hardcoded address as suggested
const HARDCODED_ADDRESS = "0x6077c1100fc0e5adf8e812dc576040f0af8cb1158a7a1a0626adb9c831f46a8b";

export async function createAgent() {
  const privateKeyStr = process.env.APTOS_PRIVATE_KEY;
  
  if (!privateKeyStr) {
    throw new Error("APTOS_PRIVATE_KEY is missing.");
  }
  
  try {
    // Clean and validate the key
    let cleanKey = privateKeyStr.trim();
    if (cleanKey.startsWith("0x")) {
      cleanKey = cleanKey.substring(2);
    }
    
    // Create the private key object
    const privateKey = new PrivateKey(cleanKey);
    
    // Create signer
    const signer = new LocalSigner(privateKey, Network.DEVNET);
    
    console.log("✅ Successfully created agent with hardcoded address:", HARDCODED_ADDRESS);
    
    return { 
      signer, 
      aptos,
      address: HARDCODED_ADDRESS  // Use the hardcoded address
    };
  } catch (error) {
    console.error("❌ Agent creation error:", error);
    throw new Error(`Failed to create blockchain agent: ${error.message}`);
  }
}