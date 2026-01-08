---
description: Prepare and verify the hackathon demo is working
allowed-tools: Bash(forge:*), Bash(pnpm:*), Bash(curl:*), Read
---

# Demo Preparation Checklist

Verify the NULLIFIER hackathon demo is ready for judges.

## Demo Flow to Verify

1. **Landing Page** - Hero loads, wallet connect works
2. **Connect Wallet** - MetaMask connects to Mantle Sepolia
3. **Verify Page** - Plaid Link button appears
4. **Plaid Link** - Opens and accepts test credentials:
   - Bank: "First Platypus Bank"
   - Username: `user_good`
   - Password: `pass_good`
5. **Proof Generation** - Progress indicator shows
6. **Transaction** - Wallet prompts for confirmation
7. **Success** - Credential minted, link to explorer
8. **Vault Page** - Shows vault cards with TVL
9. **Deposit** - Can deposit into vault (if mETH available)

## Verification Steps

### 1. Check Contracts Deployed
```bash
# Check NullifierRegistry is deployed
cast call <NULLIFIER_REGISTRY> "name()" --rpc-url https://rpc.sepolia.mantle.xyz
```

### 2. Check Frontend Builds
```bash
cd frontend && pnpm build
```

### 3. Check Environment Variables
Ensure `.env.local` has:
- NEXT_PUBLIC_RECLAIM_APP_ID
- RECLAIM_APP_SECRET
- PLAID_CLIENT_ID
- PLAID_SECRET
- NEXT_PUBLIC_WC_PROJECT_ID

### 4. Check Contract Addresses in Frontend
Verify `frontend/lib/contracts.ts` has correct addresses.

### 5. Test Plaid Sandbox Connection
```bash
curl -X POST https://sandbox.plaid.com/institutions/get \
  -H 'Content-Type: application/json' \
  -d '{"client_id":"'$PLAID_CLIENT_ID'","secret":"'$PLAID_SECRET'","count":1,"offset":0,"country_codes":["US"]}'
```

## Judge Demo Script

```
"Hi, I'm demonstrating NULLIFIER - privacy-preserving accredited 
investor verification for Mantle's RWA ecosystem.

[Connect wallet to Mantle Sepolia]

The problem: Tokenized securities require accredited investor 
verification, but current methods are expensive, slow, and 
expose sensitive financial data.

[Click 'Verify with Bank Data']
[Select 'First Platypus Bank', enter user_good/pass_good]

NULLIFIER uses zero-knowledge proofs to verify you meet the 
$200K income threshold WITHOUT revealing your actual income.

[Watch proof generation]

The proof is generated locally using Reclaim Protocol's zkTLS.
Now submitting to Mantle...

[Confirm transaction]

Done! I now have a soulbound credential that proves I'm accredited.
But look - my actual income is nowhere on-chain.

[Navigate to Vault page]
[Show deposit into mETH vault]

This credential unlocks access to compliant yield vaults.
Verify once, access everywhere, expose nothing.

Questions?"
```

$ARGUMENTS
