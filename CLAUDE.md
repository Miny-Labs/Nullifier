# NULLIFIER

Privacy-preserving accredited investor verification for Mantle's RWA ecosystem.

## Quick Facts

- **Project**: ZK-KYC credential system for SEC-compliant tokenized securities access
- **Target**: Mantle Global Hackathon 2025 - ZK & Privacy Track ($15K) + RWA/RealFi ($15K)
- **Deadline**: 7 days remaining
- **Chain**: Mantle Sepolia Testnet (Chain ID: 5003)

## Tech Stack

### Smart Contracts
- **Framework**: Foundry (forge, anvil, cast)
- **Language**: Solidity 0.8.20+
- **Libraries**: OpenZeppelin Contracts v5 (ERC-721, ERC-4626, AccessControl)
- **Verification**: Reclaim Protocol on-chain verifier

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **Web3**: wagmi v2 + viem
- **State**: React Query (TanStack Query)

### Integrations
- **Bank Data**: Plaid SDK (Sandbox mode)
- **ZK Proofs**: Reclaim Protocol SDK
- **Wallet**: RainbowKit / ConnectKit

## Commands

```bash
# Smart Contracts (from /contracts)
forge build                    # Compile contracts
forge test                     # Run all tests
forge test -vvv               # Verbose test output
forge test --match-test <name> # Run specific test
forge script script/Deploy.s.sol --rpc-url mantle-sepolia --broadcast
forge verify-contract <addr> <contract> --chain mantle-sepolia

# Frontend (from /frontend)
pnpm dev                       # Start dev server (localhost:3000)
pnpm build                     # Production build
pnpm lint                      # ESLint
pnpm typecheck                 # TypeScript check

# Full Project (from root)
pnpm install                   # Install all dependencies
pnpm dev                       # Start frontend
```

## Directory Structure

```
nullifier/
├── CLAUDE.md                 # This file
├── contracts/                # Foundry smart contracts
│   ├── src/
│   │   ├── NullifierRegistry.sol    # Soulbound credential NFT
│   │   ├── CompliantYieldVault.sol  # ERC-4626 gated vault
│   │   └── interfaces/
│   ├── test/
│   ├── script/
│   └── foundry.toml
├── frontend/                 # Next.js 14 app
│   ├── app/
│   │   ├── page.tsx         # Landing/connect
│   │   ├── verify/page.tsx  # Verification flow
│   │   └── vault/page.tsx   # Vault dashboard
│   ├── components/
│   │   ├── PlaidLink.tsx
│   │   ├── ProofGenerator.tsx
│   │   └── VaultCard.tsx
│   ├── lib/
│   │   ├── contracts.ts     # Contract ABIs + addresses
│   │   ├── reclaim.ts       # Reclaim SDK wrapper
│   │   └── plaid.ts         # Plaid client
│   └── hooks/
├── docs/
│   ├── one-pager.pdf
│   └── architecture.png
└── README.md
```

## Key Contracts

### NullifierRegistry.sol
- ERC-721 soulbound (non-transferable) credential
- Stores accreditation type: Income ($200K+), Net Worth ($1M+), or Both
- 1-year expiry with revocation capability
- Integrates with Reclaim Protocol verifier

### CompliantYieldVault.sol
- ERC-4626 tokenized vault standard
- `onlyAccredited` modifier checks NullifierRegistry
- Supports mETH and cmETH as underlying assets
- Unrestricted withdrawals (can exit anytime)

## Code Style

### Solidity
- Use NatSpec comments on all public/external functions
- Custom errors over require strings: `error NotAccredited();`
- Events for all state changes
- CEI pattern (Checks-Effects-Interactions)
- No floating pragmas: use `pragma solidity 0.8.20;`

### TypeScript
- Strict mode enabled
- Prefer `interface` over `type` for object shapes
- Use absolute imports: `@/components/...`
- Async/await over .then() chains
- Destructure imports: `import { useState } from 'react'`

### React
- Functional components only
- Custom hooks for reusable logic
- Loading/error/empty states for all async operations
- Use shadcn/ui components for forms, cards, dialogs

## Critical Implementation Notes

### Plaid Sandbox
```typescript
// Test credentials for demo
const PLAID_SANDBOX_CREDENTIALS = {
  username: 'user_good',
  password: 'pass_good'
};

// High-income test user (for $200K+ threshold)
const HIGH_INCOME_USER = 'user_credit_profile_excellent';
```

### Reclaim Protocol
- App ID and Secret from Reclaim Dashboard
- Use `plaid-income-verification` provider schema
- Proof contains: threshold met (bool), timestamp, attestor signature
- On-chain verification via `ReclaimVerifier.verifyProof(bytes proof)`

### Mantle Sepolia
```typescript
const MANTLE_SEPOLIA = {
  id: 5003,
  name: 'Mantle Sepolia',
  rpcUrl: 'https://rpc.sepolia.mantle.xyz',
  blockExplorer: 'https://sepolia.mantlescan.xyz',
  nativeCurrency: { name: 'MNT', symbol: 'MNT', decimals: 18 }
};
```

### Contract Addresses (Deploy and update)
```typescript
// Update after deployment
const CONTRACTS = {
  nullifierRegistry: '0x...', // Deploy first
  compliantMethVault: '0x...', // mETH vault
  compliantCmethVault: '0x...', // cmETH vault
  reclaimVerifier: '0x...' // Reclaim's deployed verifier
};
```

## Testing Strategy

### Smart Contracts
- Unit tests for each function
- Integration tests for full verification flow
- Fork tests against Mantle Sepolia
- Gas optimization benchmarks

### Frontend
- Component tests with React Testing Library
- E2E happy path with Playwright (optional)
- Manual testing with Plaid sandbox

## Demo Flow (For Judges)

1. **Connect Wallet** → MetaMask to Mantle Sepolia
2. **Verify** → Click "Verify with Bank Data"
3. **Plaid Link** → Select "First Platypus Bank" → user_good/pass_good
4. **ZK Proof** → Watch proof generation (5-10 seconds)
5. **Mint Credential** → Transaction on Mantle
6. **Access Vault** → Deposit mETH into compliant vault
7. **Proof Explorer** → Show what was proven vs. what stayed private

## Hackathon Deliverables Checklist

- [ ] Smart contracts deployed to Mantle Sepolia
- [ ] Frontend working with Plaid sandbox
- [ ] End-to-end verification flow functional
- [ ] Demo video (3-5 minutes)
- [ ] README with setup instructions
- [ ] One-pager pitch document
- [ ] GitHub repo public and documented

## Anti-Patterns to Avoid

- ❌ Don't use `any` in TypeScript
- ❌ Don't store actual income/net worth on-chain
- ❌ Don't make credentials transferable
- ❌ Don't use floating pragma versions
- ❌ Don't skip loading states in UI
- ❌ Don't hardcode private keys anywhere

## Resources

- [Mantle Docs](https://docs.mantle.xyz)
- [Reclaim Protocol](https://dev.reclaimprotocol.org)
- [Plaid Sandbox](https://plaid.com/docs/sandbox/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)
- [Foundry Book](https://book.getfoundry.sh)
- [wagmi Docs](https://wagmi.sh)
