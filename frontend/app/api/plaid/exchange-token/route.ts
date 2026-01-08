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

export async function POST(request: Request) {
  if (!PLAID_CLIENT_ID || !PLAID_SECRET) {
    return NextResponse.json(
      { error: "Plaid credentials not configured" },
      { status: 500 }
    );
  }

  try {
    const { publicToken } = await request.json();

    if (!publicToken) {
      return NextResponse.json(
        { error: "Public token is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${PLAID_BASE_URL}/item/public_token/exchange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        public_token: publicToken,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Plaid exchange error:", error);
      return NextResponse.json(
        { error: error.error_message || "Failed to exchange token" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      accessToken: data.access_token,
      itemId: data.item_id,
    });
  } catch (error) {
    console.error("Error exchanging token:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
