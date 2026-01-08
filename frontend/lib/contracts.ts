// Contract addresses - update after deployment to Mantle Sepolia
export const NULLIFIER_REGISTRY_ADDRESS = process.env
  .NEXT_PUBLIC_NULLIFIER_REGISTRY as `0x${string}` | undefined;
export const METH_VAULT_ADDRESS = process.env
  .NEXT_PUBLIC_METH_VAULT as `0x${string}` | undefined;
export const CMETH_VAULT_ADDRESS = process.env
  .NEXT_PUBLIC_CMETH_VAULT as `0x${string}` | undefined;

// Chain configuration
export const MANTLE_SEPOLIA_CHAIN_ID = 5003;

// NullifierRegistry ABI
export const NULLIFIER_REGISTRY_ABI = [
  {
    inputs: [{ name: "_reclaimVerifier", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "AlreadyHasCredential", type: "error" },
  { inputs: [], name: "CredentialExpired", type: "error" },
  { inputs: [], name: "CredentialIsRevoked", type: "error" },
  { inputs: [], name: "CredentialNotFound", type: "error" },
  { inputs: [], name: "InvalidProof", type: "error" },
  { inputs: [], name: "SoulboundToken", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "holder", type: "address" },
      { indexed: true, name: "tokenId", type: "uint256" },
      { indexed: false, name: "accreditationType", type: "uint8" },
      { indexed: false, name: "expiresAt", type: "uint256" },
    ],
    name: "CredentialMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "holder", type: "address" },
      { indexed: true, name: "tokenId", type: "uint256" },
    ],
    name: "CredentialRevoked",
    type: "event",
  },
  {
    inputs: [{ name: "holder", type: "address" }],
    name: "isAccredited",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "holder", type: "address" }],
    name: "hasCredential",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "holder", type: "address" }],
    name: "getCredential",
    outputs: [
      {
        components: [
          { name: "accreditationType", type: "uint8" },
          { name: "issuedAt", type: "uint256" },
          { name: "expiresAt", type: "uint256" },
          { name: "revoked", type: "bool" },
        ],
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "holder", type: "address" }],
    name: "tokenIdOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "proof", type: "bytes" },
      { name: "accreditationType", type: "uint8" },
    ],
    name: "mintCredential",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "holder", type: "address" }],
    name: "revokeCredential",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

// CompliantYieldVault ABI (ERC-4626)
export const COMPLIANT_VAULT_ABI = [
  {
    inputs: [
      { name: "_asset", type: "address" },
      { name: "_nullifierRegistry", type: "address" },
      { name: "_name", type: "string" },
      { name: "_symbol", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "NotAccredited", type: "error" },
  { inputs: [], name: "ZeroAddress", type: "error" },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "canDeposit",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "asset",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAssets",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "shares", type: "uint256" }],
    name: "convertToAssets",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "assets", type: "uint256" }],
    name: "convertToShares",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "assets", type: "uint256" },
      { name: "receiver", type: "address" },
    ],
    name: "deposit",
    outputs: [{ name: "shares", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "shares", type: "uint256" },
      { name: "receiver", type: "address" },
    ],
    name: "mint",
    outputs: [{ name: "assets", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "assets", type: "uint256" },
      { name: "receiver", type: "address" },
      { name: "owner", type: "address" },
    ],
    name: "withdraw",
    outputs: [{ name: "shares", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "shares", type: "uint256" },
      { name: "receiver", type: "address" },
      { name: "owner", type: "address" },
    ],
    name: "redeem",
    outputs: [{ name: "assets", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "receiver", type: "address" }],
    name: "maxDeposit",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "receiver", type: "address" }],
    name: "maxMint",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "owner", type: "address" }],
    name: "maxWithdraw",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "owner", type: "address" }],
    name: "maxRedeem",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

// Accreditation types enum matching the contract
export enum AccreditationType {
  None = 0,
  Income = 1, // $200K+ annual income
  NetWorth = 2, // $1M+ net worth
  Both = 3, // Meets both thresholds
}

export const ACCREDITATION_LABELS: Record<AccreditationType, string> = {
  [AccreditationType.None]: "None",
  [AccreditationType.Income]: "Income ($200K+)",
  [AccreditationType.NetWorth]: "Net Worth ($1M+)",
  [AccreditationType.Both]: "Both",
};
