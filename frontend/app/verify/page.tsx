"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProofGenerator } from "@/components/ProofGenerator";
import { useCredential } from "@/hooks/useCredential";
import { WalletConnect } from "@/components/WalletConnect";

export default function VerifyPage() {
  const { isConnected } = useAccount();
  const { hasCredential, isLoading, accreditationLabel, daysUntilExpiry } =
    useCredential();
  const router = useRouter();

  // Redirect if already verified
  useEffect(() => {
    if (hasCredential && !isLoading) {
      router.push("/vault");
    }
  }, [hasCredential, isLoading, router]);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">
            NULLIFIER
          </a>
          <WalletConnect />
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-center mb-2">
            Verify Your Status
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Prove you&apos;re an accredited investor using bank data
          </p>

          {!isConnected ? (
            <div className="rounded-lg border p-8 text-center">
              <p className="mb-4 text-muted-foreground">
                Connect your wallet to continue
              </p>
              <WalletConnect />
            </div>
          ) : isLoading ? (
            <div className="rounded-lg border p-8 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            </div>
          ) : hasCredential ? (
            <div className="rounded-lg border p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="font-medium text-green-600 mb-2">Already Verified</p>
              <p className="text-sm text-muted-foreground mb-1">
                Type: {accreditationLabel}
              </p>
              {daysUntilExpiry !== undefined && (
                <p className="text-sm text-muted-foreground">
                  Expires in {daysUntilExpiry} days
                </p>
              )}
              <a
                href="/vault"
                className="inline-block mt-4 text-primary hover:underline"
              >
                Go to Vaults →
              </a>
            </div>
          ) : (
            <div className="rounded-lg border p-6">
              <ProofGenerator />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
