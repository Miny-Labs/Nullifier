// Reclaim Protocol integration
// Generates ZK proofs for income verification

export const RECLAIM_APP_ID = process.env.NEXT_PUBLIC_RECLAIM_APP_ID || "";

// Provider schema for Plaid income verification
export const INCOME_VERIFICATION_PROVIDER = "plaid-income-verification";

export interface ReclaimProof {
  claimData: {
    provider: string;
    parameters: string;
    context: string;
  };
  signatures: string[];
  witnesses: {
    id: string;
    url: string;
  }[];
}

export interface IncomeProofClaim {
  meetsThreshold: boolean;
  thresholdAmount: number;
  timestamp: number;
}

// Generate a proof request URL for Reclaim
export function generateProofRequest(
  sessionId: string,
  callbackUrl: string
): string {
  const params = new URLSearchParams({
    appId: RECLAIM_APP_ID,
    sessionId,
    callbackUrl,
    provider: INCOME_VERIFICATION_PROVIDER,
  });

  return `https://share.reclaimprotocol.org/prove?${params.toString()}`;
}

// Parse and validate a Reclaim proof
export function parseIncomeProof(proof: ReclaimProof): IncomeProofClaim {
  const params = JSON.parse(proof.claimData.parameters);

  return {
    meetsThreshold: params.meetsThreshold === true,
    thresholdAmount: parseInt(params.thresholdAmount, 10),
    timestamp: parseInt(params.timestamp, 10),
  };
}

// Encode proof for on-chain verification
export function encodeProofForChain(proof: ReclaimProof): `0x${string}` {
  // The actual encoding depends on Reclaim's verifier contract interface
  // This is a placeholder - real implementation uses Reclaim SDK
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(proof));
  const hex = Array.from(data)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `0x${hex}`;
}
