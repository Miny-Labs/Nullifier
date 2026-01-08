// Plaid configuration
// Note: Actual Plaid client is server-side only

export const PLAID_ENV = process.env.PLAID_ENV || "sandbox";

// Plaid sandbox test credentials for demo
export const PLAID_DEMO_BANK = "First Platypus Bank";
export const PLAID_DEMO_USERNAME = "user_good";
export const PLAID_DEMO_PASSWORD = "pass_good";

// Income thresholds for accreditation (SEC Regulation D)
export const ACCREDITATION_THRESHOLDS = {
  INCOME_SINGLE: 200_000, // $200K for single filer
  INCOME_JOINT: 300_000, // $300K for joint filers
  NET_WORTH: 1_000_000, // $1M net worth (excluding primary residence)
} as const;

// API routes for Plaid integration
export async function createLinkToken(): Promise<string> {
  const response = await fetch("/api/plaid/create-link-token", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to create Plaid link token");
  }

  const data = await response.json();
  return data.linkToken;
}

export interface ExchangeResult {
  accessToken: string;
  itemId: string;
}

export async function exchangePublicToken(
  publicToken: string
): Promise<ExchangeResult> {
  const response = await fetch("/api/plaid/exchange-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to exchange Plaid token");
  }

  return response.json();
}
