"use client";

import { useAccount } from "wagmi";
import { WalletConnect } from "@/components/WalletConnect";
import { VaultCard } from "@/components/VaultCard";
import { useCredential } from "@/hooks/useCredential";
import { METH_VAULT_ADDRESS, CMETH_VAULT_ADDRESS } from "@/lib/contracts";
import { Button } from "@/components/ui/button";

export default function VaultPage() {
  const { isConnected } = useAccount();
  const { hasCredential, isAccredited, accreditationLabel, daysUntilExpiry, isLoading } =
    useCredential();

  const vaults = [
    {
      name: "mETH Vault",
      symbol: "cvMETH",
      address: METH_VAULT_ADDRESS,
      apy: "5.2%",
      assetName: "mETH",
    },
    {
      name: "cmETH Vault",
      symbol: "cvCMETH",
      address: CMETH_VAULT_ADDRESS,
      apy: "4.8%",
      assetName: "cmETH",
    },
  ].filter((v) => v.address) as Array<{
    name: string;
    symbol: string;
    address: `0x${string}`;
    apy: string;
    assetName: string;
  }>;

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">
            NULLIFIER
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/verify"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Verify
            </a>
            <WalletConnect />
          </div>
        </div>
      </header>

      <section className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Compliant Yield Vaults</h1>
              <p className="text-muted-foreground">
                Deposit into SEC-compliant yield opportunities on Mantle
              </p>
            </div>

            {/* Status Banner */}
            {isConnected && (
              <div
                className={`rounded-lg border p-4 mb-8 ${
                  isAccredited
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900"
                    : "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isAccredited ? "bg-green-500" : "bg-amber-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium">
                        {isLoading
                          ? "Checking status..."
                          : isAccredited
                            ? "Accredited Investor"
                            : hasCredential
                              ? "Credential Expired"
                              : "Not Verified"}
                      </p>
                      {isAccredited && (
                        <p className="text-sm text-muted-foreground">
                          {accreditationLabel} • {daysUntilExpiry} days until
                          expiry
                        </p>
                      )}
                    </div>
                  </div>
                  {!isAccredited && (
                    <Button asChild variant="outline" size="sm">
                      <a href="/verify">
                        {hasCredential ? "Reverify" : "Get Verified"}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Wallet Connection Prompt */}
            {!isConnected && (
              <div className="rounded-lg border p-8 text-center mb-8">
                <p className="text-muted-foreground mb-4">
                  Connect your wallet to view vault positions
                </p>
                <WalletConnect />
              </div>
            )}

            {/* Vaults Grid */}
            {vaults.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {vaults.map((vault) => (
                  <VaultCard key={vault.address} {...vault} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border p-8 text-center">
                <p className="text-muted-foreground mb-2">
                  No vaults deployed yet
                </p>
                <p className="text-sm text-muted-foreground">
                  Deploy contracts and update the environment variables to see
                  available vaults.
                </p>
              </div>
            )}

            {/* Info Section */}
            <div className="mt-12 rounded-lg bg-muted/50 p-6">
              <h2 className="font-semibold mb-4">About Compliant Vaults</h2>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="font-medium mb-2">Deposit Requirements</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Valid accredited investor credential</li>
                    <li>• Credential must not be expired or revoked</li>
                    <li>• Approval for vault to spend your tokens</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Withdrawal Policy</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Withdrawals are unrestricted</li>
                    <li>• No credential required to withdraw</li>
                    <li>• Exit your position at any time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
