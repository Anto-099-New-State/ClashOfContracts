import { NextResponse } from "next/server";
import { trainTroops } from "@/app/utils/gameActions";  

export async function POST(req) {
  try {
    const { troopType, quantity } = await req.json();
    console.log("📌 Training troops:", troopType, quantity);

    const result = await trainTroops(troopType, quantity);  

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Failed to train troops." }, { status: 500 });
  }
}
