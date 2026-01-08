import { NextResponse } from "next/server";

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || "sandbox";

const PLAID_BASE_URL =
  PLAID_ENV === "production"
    ? "https://production.plaid.com"
    : PLAID_ENV === "development"
      ? "https://development.plaid.com"
      : "https://sandbox.plaid.com";

export async function POST() {
  if (!PLAID_CLIENT_ID || !PLAID_SECRET) {
    return NextResponse.json(
      { error: "Plaid credentials not configured" },
      { status: 500 }
    );
  }

  try {
    const userId = `user-${Date.now()}`;

    const response = await fetch(`${PLAID_BASE_URL}/link/token/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        client_name: "Nullifier",
        user: {
          client_user_id: userId,
        },
        products: ["income_verification"],
        income_verification: {
          income_source_types: ["bank"],
          bank_income: {
            days_requested: 365,
          },
        },
        country_codes: ["US"],
        language: "en",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Plaid error:", error);
      return NextResponse.json(
        { error: error.error_message || "Failed to create link token" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ linkToken: data.link_token });
  } catch (error) {
    console.error("Error creating link token:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
