import { useAccount, useReadContract, useReadContracts } from "wagmi";
import {
  NULLIFIER_REGISTRY_ABI,
  NULLIFIER_REGISTRY_ADDRESS,
  AccreditationType,
  ACCREDITATION_LABELS,
} from "@/lib/contracts";

export interface Credential {
  accreditationType: AccreditationType;
  issuedAt: bigint;
  expiresAt: bigint;
  revoked: boolean;
}

export function useCredential() {
  const { address } = useAccount();

  const { data, isLoading, refetch } = useReadContracts({
    contracts: [
      {
        address: NULLIFIER_REGISTRY_ADDRESS,
        abi: NULLIFIER_REGISTRY_ABI,
        functionName: "hasCredential",
        args: address ? [address] : undefined,
      },
      {
        address: NULLIFIER_REGISTRY_ADDRESS,
        abi: NULLIFIER_REGISTRY_ABI,
        functionName: "isAccredited",
        args: address ? [address] : undefined,
      },
      {
        address: NULLIFIER_REGISTRY_ADDRESS,
        abi: NULLIFIER_REGISTRY_ABI,
        functionName: "getCredential",
        args: address ? [address] : undefined,
      },
    ],
    query: {
      enabled: !!address && !!NULLIFIER_REGISTRY_ADDRESS,
    },
  });

  const hasCredential = data?.[0]?.result as boolean | undefined;
  const isAccredited = data?.[1]?.result as boolean | undefined;
  const credentialData = data?.[2]?.result as
    | [number, bigint, bigint, boolean]
    | undefined;

  const credential: Credential | undefined = credentialData
    ? {
        accreditationType: credentialData[0] as AccreditationType,
        issuedAt: credentialData[1],
        expiresAt: credentialData[2],
        revoked: credentialData[3],
      }
    : undefined;

  const accreditationLabel = credential
    ? ACCREDITATION_LABELS[credential.accreditationType]
    : undefined;

  const expiresIn = credential
    ? Number(credential.expiresAt) - Math.floor(Date.now() / 1000)
    : undefined;

  const daysUntilExpiry = expiresIn
    ? Math.floor(expiresIn / 86400)
    : undefined;

  return {
    hasCredential: !!hasCredential,
    isAccredited: !!isAccredited,
    credential,
    accreditationLabel,
    daysUntilExpiry,
    isLoading,
    refetch,
  };
}
