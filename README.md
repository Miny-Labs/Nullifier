# NULLIFIER

> Privacy-Preserving Accredited Investor Verification for Mantle's RWA Ecosystem

**Prove you're an accredited investor using real bank data — without revealing your income, net worth, or identity documents.**

![Demo](docs/demo.gif)

## 🎯 Problem

Tokenized securities require accredited investor verification under SEC Regulation D. Current solutions:

| Method | Cost | Time | Privacy |
|--------|------|------|---------|
| CPA/Attorney letter | $200-500 | 5-14 days | ❌ Full disclosure |
| Third-party verification | $50-150 | 1-3 days | ❌ Documents stored |
| Self-certification | Free | Instant | ⚠️ Legal risk |

**Result:** 60-70% of qualified investors abandon onboarding.

## ✨ Solution

NULLIFIER uses **zero-knowledge proofs** to verify accreditation from live bank data:

1. **Connect Bank** via Plaid (read-only, secure)
2. **Generate ZK Proof** using Reclaim Protocol's zkTLS
3. **Mint Credential** on Mantle (soulbound NFT)
4. **Access Vaults** with compliant yield

**What gets proven:** Income ≥ $200,000 (SEC threshold)  
**What stays private:** Actual income, account balances, documents

## 🏗 Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────────┐
│ Plaid Link  │────▶│ Reclaim SDK  │────▶│ Mantle Contracts    │
│ (Bank Data) │     │ (ZK Proofs)  │     │ (Credential + Vault)│
└─────────────┘     └──────────────┘     └─────────────────────┘
```

### Smart Contracts

- **NullifierRegistry.sol** - Soulbound ERC-721 credential with 1-year expiry
- **CompliantYieldVault.sol** - ERC-4626 vault gated by credential

### Frontend

- Next.js 14 (App Router) + TypeScript
- wagmi v2 + viem for Web3
- shadcn/ui + Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- Foundry
- MetaMask with Mantle Sepolia

### Installation

```bash
# Clone the repo
git clone https://github.com/Miny-Labs/Nullifier.git
cd nullifier

# Install dependencies
pnpm install

# Set up environment variables
cp frontend/.env.example frontend/.env.local
# Edit with your keys
```

### Environment Variables

```env
# frontend/.env.local
NEXT_PUBLIC_RECLAIM_APP_ID=your-app-id
RECLAIM_APP_SECRET=your-app-secret
PLAID_CLIENT_ID=your-client-id
PLAID_SECRET=your-sandbox-secret
NEXT_PUBLIC_WC_PROJECT_ID=your-walletconnect-id
```

### Development

```bash
# Start frontend
cd frontend && pnpm dev

# In another terminal, run contract tests
cd contracts && forge test -vvv
```

### Deployment

```bash
# Deploy contracts to Mantle Sepolia
cd contracts
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url https://rpc.sepolia.mantle.xyz \
  --broadcast
```

## 📖 Demo

### Test Credentials (Plaid Sandbox)

1. Select "First Platypus Bank"
2. Username: `user_good`
3. Password: `pass_good`

### Demo Flow

1. Connect wallet to Mantle Sepolia
2. Click "Verify with Bank Data"
3. Complete Plaid Link flow
4. Wait for ZK proof generation (~5-10 seconds)
5. Confirm transaction in wallet
6. View minted credential
7. Access compliant yield vaults

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Chain | Mantle Sepolia (Chain ID: 5003) |
| Contracts | Solidity 0.8.24, Foundry, OpenZeppelin v5 |
| ZK Proofs | Reclaim Protocol (zkTLS) |
| Bank Data | Plaid (Sandbox) |
| Frontend | Next.js 14, TypeScript, wagmi v2 |
| Styling | Tailwind CSS, shadcn/ui |

## 📁 Project Structure

```
nullifier/
├── CLAUDE.md              # AI assistant context
├── .claude/               # Claude Code skills
├── contracts/             # Smart contracts (Foundry)
│   ├── src/
│   │   ├── NullifierRegistry.sol
│   │   └── CompliantYieldVault.sol
│   ├── test/
│   └── script/
├── frontend/              # Next.js app
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── hooks/
└── docs/
    ├── one-pager.pdf
    └── architecture.png
```

## 🏆 Hackathon

**Mantle Global Hackathon 2025**

Targeting:
- 🎯 ZK & Privacy Track ($15,000)
- 🎯 RWA / RealFi Track ($15,000)
- 🎯 Best UX / Demo ($5,000)
- 🎯 Best Mantle Integration ($4,000)
- 🎯 Grand Prize ($30,000)

## 📜 License

MIT

## 🔗 Links

- [Demo Video](https://youtube.com/...)
- [One-Pager](docs/one-pager.pdf)
- [Mantle Docs](https://docs.mantle.xyz)
- [Reclaim Protocol](https://reclaimprotocol.org)
- [Plaid Sandbox](https://plaid.com/docs/sandbox/)

---

Built with 🔐 for Mantle Global Hackathon 2025
