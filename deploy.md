---
description: Deploy smart contracts to Mantle Sepolia testnet
allowed-tools: Bash(forge:*), Bash(cast:*), Read, Write
---

# Deploy Contracts to Mantle Sepolia

Deploy the NULLIFIER smart contracts to Mantle Sepolia testnet.

## Pre-deployment Checklist

1. Verify all contracts compile: `forge build`
2. Run all tests: `forge test`
3. Check environment variables are set:
   - PRIVATE_KEY
   - RECLAIM_VERIFIER (Reclaim's deployed verifier on Mantle Sepolia)
   - METH_ADDRESS (mETH token on Mantle Sepolia, or mock)

## Deployment Steps

1. **Build contracts**
   ```bash
   cd contracts && forge build
   ```

2. **Run tests one more time**
   ```bash
   forge test -vvv
   ```

3. **Deploy to Mantle Sepolia**
   ```bash
   forge script script/Deploy.s.sol:DeployScript \
     --rpc-url https://rpc.sepolia.mantle.xyz \
     --broadcast \
     --verify \
     -vvvv
   ```

4. **Save deployed addresses**
   Update `frontend/lib/contracts.ts` with the new addresses.

5. **Verify on MantleScan** (if not auto-verified)
   ```bash
   forge verify-contract <ADDRESS> NullifierRegistry \
     --chain 5003 \
     --etherscan-api-key $MANTLESCAN_API_KEY
   ```

## Post-deployment

1. Update contract addresses in frontend
2. Test frontend integration
3. Document addresses in README

$ARGUMENTS
