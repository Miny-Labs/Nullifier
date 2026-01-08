import { useAccount, useReadContracts } from "wagmi";
import { formatEther } from "viem";
import { COMPLIANT_VAULT_ABI } from "@/lib/contracts";

export interface VaultPosition {
  shares: string;
  assets: string;
  tvl: string;
  canDeposit: boolean;
}

export function useVaultPosition(vaultAddress: `0x${string}` | undefined) {
  const { address } = useAccount();

  const { data, isLoading, refetch } = useReadContracts({
    contracts: [
      {
        address: vaultAddress,
        abi: COMPLIANT_VAULT_ABI,
        functionName: "balanceOf",
        args: address ? [address] : undefined,
      },
      {
        address: vaultAddress,
        abi: COMPLIANT_VAULT_ABI,
        functionName: "totalAssets",
      },
      {
        address: vaultAddress,
        abi: COMPLIANT_VAULT_ABI,
        functionName: "canDeposit",
        args: address ? [address] : undefined,
      },
    ],
    query: {
      enabled: !!address && !!vaultAddress,
    },
  });

  const shares = (data?.[0]?.result as bigint) || 0n;
  const tvl = (data?.[1]?.result as bigint) || 0n;
  const canDeposit = (data?.[2]?.result as boolean) || false;

  // Get assets from shares using a separate call
  const { data: assetsData } = useReadContracts({
    contracts: [
      {
        address: vaultAddress,
        abi: COMPLIANT_VAULT_ABI,
        functionName: "convertToAssets",
        args: [shares],
      },
    ],
    query: {
      enabled: !!vaultAddress && shares > 0n,
    },
  });

  const assets = (assetsData?.[0]?.result as bigint) || 0n;

  return {
    shares: formatEther(shares),
    assets: formatEther(assets),
    tvl: formatEther(tvl),
    canDeposit,
    isLoading,
    refetch,
  };
}
