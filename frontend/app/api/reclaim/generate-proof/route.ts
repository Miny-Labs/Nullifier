import { NextResponse } from "next/server";

const RECLAIM_APP_ID = process.env.NEXT_PUBLIC_RECLAIM_APP_ID;
const RECLAIM_APP_SECRET = process.env.RECLAIM_APP_SECRET;

// Income threshold for accreditation (SEC Reg D)
const INCOME_THRESHOLD = 200_000;

export async function POST(request: Request) {
  if (!RECLAIM_APP_ID || !RECLAIM_APP_SECRET) {
    return NextResponse.json(
      { error: "Reclaim credentials not configured" },
      { status: 500 }
    );
  }

  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token is required" },
        { status: 400 }
      );
    }

    // In production, this would:
    // 1. Fetch income data from Plaid using the access token
    // 2. Generate a ZK proof via Reclaim Protocol SDK
    // 3. Return the proof for on-chain verification
    //
    // The Reclaim SDK would be used like:
    // const reclaim = new ReclaimProofRequest(RECLAIM_APP_ID, RECLAIM_APP_SECRET);
    // const proof = await reclaim.generateProof({
    //   provider: 'plaid-income-verification',
    //   parameters: { meetsThreshold: true, thresholdAmount: INCOME_THRESHOLD }
    // });

    // For now, return a structured proof object that matches the expected format
    // This will be replaced with actual Reclaim SDK integration
    const proof = {
      claimData: {
        provider: "plaid-income-verification",
        parameters: JSON.stringify({
          meetsThreshold: true,
          thresholdAmount: INCOME_THRESHOLD,
          timestamp: Date.now(),
        }),
        context: JSON.stringify({
          appId: RECLAIM_APP_ID,
          version: "1.0.0",
        }),
      },
      signatures: [],
      witnesses: [
        {
          id: "reclaim-attestor",
          url: "https://attestor.reclaimprotocol.org",
        },
      ],
    };

    return NextResponse.json(proof);
  } catch (error) {
    console.error("Error generating proof:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
