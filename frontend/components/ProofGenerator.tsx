"use client";

import { useState, useCallback } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { PlaidLink } from "@/components/PlaidLink";
import { Button } from "@/components/ui/button";
import {
  NULLIFIER_REGISTRY_ABI,
  NULLIFIER_REGISTRY_ADDRESS,
  AccreditationType,
} from "@/lib/contracts";
import { encodeProofForChain, type ReclaimProof } from "@/lib/reclaim";
import { useCredential } from "@/hooks/useCredential";

type VerificationStep = "connect" | "generating" | "minting" | "complete";

export function ProofGenerator() {
  const { address } = useAccount();
  const { refetch } = useCredential();
  const [step, setStep] = useState<VerificationStep>("connect");
  const [error, setError] = useState<string | null>(null);
  const [proof, setProof] = useState<ReclaimProof | null>(null);

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isTxLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleBankConnected = useCallback(
    async (accessToken: string, _itemId: string) => {
      setStep("generating");
      setError(null);

      try {
        // In production, this would call Reclaim Protocol to generate the ZK proof
        // For now, we'll create a placeholder that simulates the flow
        const response = await fetch("/api/reclaim/generate-proof", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate proof");
        }

        const generatedProof = await response.json();
        setProof(generatedProof);
        setStep("minting");

        // Automatically trigger mint
        if (NULLIFIER_REGISTRY_ADDRESS) {
          const encodedProof = encodeProofForChain(generatedProof);

          writeContract({
            address: NULLIFIER_REGISTRY_ADDRESS,
            abi: NULLIFIER_REGISTRY_ABI,
            functionName: "mintCredential",
            args: [encodedProof, AccreditationType.Income],
          });
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Proof generation failed";
        setError(message);
        setStep("connect");
      }
    },
    [writeContract]
  );

  // Update step when transaction completes
  if (isSuccess && step === "minting") {
    setStep("complete");
    refetch();
  }

  if (!address) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Connect your wallet to continue</p>
      </div>
    );
  }

  if (!NULLIFIER_REGISTRY_ADDRESS) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Contract not deployed</p>
        <p className="text-sm text-muted-foreground mt-2">
          Please deploy the NullifierRegistry contract and update the environment variables.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex justify-between text-sm">
        {["Connect Bank", "Generate Proof", "Mint Credential"].map(
          (label, i) => {
            const stepIndex = ["connect", "generating", "minting", "complete"].indexOf(step);
            const isActive = i <= stepIndex;
            const isCurrent = i === stepIndex || (i === 2 && step === "complete");

            return (
              <div
                key={label}
                className={`flex items-center gap-2 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    isCurrent
                      ? "bg-primary text-primary-foreground"
                      : isActive
                        ? "bg-primary/20 text-primary"
                        : "bg-muted"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="hidden sm:inline">{label}</span>
              </div>
            );
          }
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-md bg-destructive/10 p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Step Content */}
      {step === "connect" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Connect your bank account securely via Plaid to verify your income.
            Your actual income amount will never be shared.
          </p>
          <PlaidLink
            onSuccess={handleBankConnected}
            onError={(err) => setError(err.message)}
          />
        </div>
      )}

      {step === "generating" && (
        <div className="text-center py-8">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="font-medium">Generating ZK Proof</p>
          <p className="text-sm text-muted-foreground mt-1">
            Creating a zero-knowledge proof that you meet the $200K threshold...
          </p>
        </div>
      )}

      {step === "minting" && (
        <div className="text-center py-8">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="font-medium">
            {isPending ? "Confirm in Wallet" : isTxLoading ? "Minting..." : "Processing"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {isPending
              ? "Please confirm the transaction in your wallet"
              : "Your credential is being minted on Mantle..."}
          </p>
        </div>
      )}

      {step === "complete" && (
        <div className="text-center py-8">
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
          <p className="font-medium text-green-600">Verification Complete!</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your accredited investor credential has been minted.
          </p>
          {hash && (
            <a
              href={`https://sepolia.mantlescan.xyz/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline mt-2 inline-block"
            >
              View on MantleScan →
            </a>
          )}
          <Button asChild className="mt-4">
            <a href="/vault">Access Vaults</a>
          </Button>
        </div>
      )}
    </div>
  );
}
