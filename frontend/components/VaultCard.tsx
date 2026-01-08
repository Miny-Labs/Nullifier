"use client";

import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useVaultPosition } from "@/hooks/useVaultPosition";
import { useCredential } from "@/hooks/useCredential";
import { COMPLIANT_VAULT_ABI } from "@/lib/contracts";

interface VaultCardProps {
  name: string;
  symbol: string;
  address: `0x${string}`;
  apy: string;
  assetName: string;
}

export function VaultCard({
  name,
  symbol,
  address,
  apy,
  assetName,
}: VaultCardProps) {
  const { address: userAddress } = useAccount();
  const { isAccredited } = useCredential();
  const { assets, tvl, isLoading, canDeposit, refetch } = useVaultPosition(address);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<"deposit" | "withdraw">("deposit");

  const {
    writeContract,
    data: hash,
    isPending,
    reset,
  } = useWriteContract();
  const {
    isLoading: isTxLoading,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash });

  const handleDeposit = () => {
    if (!amount || !userAddress) return;

    writeContract({
      address,
      abi: COMPLIANT_VAULT_ABI,
      functionName: "deposit",
      args: [parseEther(amount), userAddress],
    });
  };

  const handleWithdraw = () => {
    if (!amount || !userAddress) return;

    writeContract({
      address,
      abi: COMPLIANT_VAULT_ABI,
      functionName: "withdraw",
      args: [parseEther(amount), userAddress, userAddress],
    });
  };

  const handleSubmit = () => {
    if (mode === "deposit") {
      handleDeposit();
    } else {
      handleWithdraw();
    }
  };

  // Reset form on success
  if (isSuccess) {
    setTimeout(() => {
      setAmount("");
      reset();
      refetch();
    }, 2000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <span className="text-sm font-normal text-green-600">{apy} APY</span>
        </CardTitle>
        <CardDescription>
          Deposit {assetName} to earn compliant yield on Mantle
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* TVL */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Value Locked</span>
          <span className="font-medium">
            {isLoading ? "..." : `${parseFloat(tvl).toFixed(4)} ${assetName}`}
          </span>
        </div>

        {/* User Position */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Your Position</span>
          <span className="font-medium">
            {isLoading ? "..." : `${parseFloat(assets).toFixed(4)} ${assetName}`}
          </span>
        </div>

        {/* Deposit/Withdraw Form */}
        {isAccredited || parseFloat(assets) > 0 ? (
          <div className="space-y-3">
            {/* Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={mode === "deposit" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("deposit")}
                className="flex-1"
                disabled={!canDeposit}
              >
                Deposit
              </Button>
              <Button
                variant={mode === "withdraw" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("withdraw")}
                className="flex-1"
                disabled={parseFloat(assets) === 0}
              >
                Withdraw
              </Button>
            </div>

            {/* Amount Input */}
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.0001"
              />
              <Button
                onClick={handleSubmit}
                disabled={isPending || isTxLoading || !amount || parseFloat(amount) <= 0}
              >
                {isPending || isTxLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    {isPending ? "Confirm..." : "Pending..."}
                  </span>
                ) : (
                  mode === "deposit" ? "Deposit" : "Withdraw"
                )}
              </Button>
            </div>

            {/* Success Message */}
            {isSuccess && (
              <p className="text-sm text-green-600 text-center">
                Transaction successful!{" "}
                <a
                  href={`https://sepolia.mantlescan.xyz/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  View →
                </a>
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-md bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Verification required to deposit
            </p>
            <Button asChild variant="link" className="mt-1 h-auto p-0">
              <a href="/verify">Get Verified →</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
