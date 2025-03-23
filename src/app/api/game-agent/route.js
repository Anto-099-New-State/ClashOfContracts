import { Aptos, AptosConfig, Network, PrivateKey } from "@aptos-labs/ts-sdk";
import { LocalSigner } from "move-agent-kit";

const aptosConfig = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(aptosConfig);
const privateKeyStr = process.env.APTOS_PRIVATE_KEY;

export async function createAgent() {
  if (!privateKeyStr) {
    throw new Error("APTOS_PRIVATE_KEY is missing.");
  }

  const formattedKey = new PrivateKey(privateKeyStr);
  const signer = new LocalSigner(formattedKey, Network.DEVNET);

  return { signer, aptos };
}
