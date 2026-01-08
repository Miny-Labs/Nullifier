---
name: frontend-patterns
description: Next.js 14 App Router patterns with wagmi, shadcn/ui, and Tailwind. Use when building React components, pages, web3 integrations, or handling loading/error states.
allowed-tools: Read, Write, Edit, Bash(pnpm:*), Bash(npx:*), Grep
---

# Frontend Patterns

## When to Use
- Creating or modifying React components
- Building pages with App Router
- Implementing wagmi hooks for web3
- Styling with Tailwind and shadcn/ui
- Handling async states (loading, error, empty)

## Project Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Landing page
│   ├── verify/
│   │   └── page.tsx         # Verification flow
│   ├── vault/
│   │   └── page.tsx         # Vault dashboard
│   └── api/                 # API routes
│       └── plaid/
│           ├── create-link-token/route.ts
│           └── exchange-token/route.ts
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── PlaidLink.tsx
│   ├── ProofGenerator.tsx
│   ├── VaultCard.tsx
│   └── WalletConnect.tsx
├── lib/
│   ├── contracts.ts         # ABIs and addresses
│   ├── reclaim.ts           # Reclaim SDK wrapper
│   ├── plaid.ts             # Plaid client
│   └── utils.ts             # Helpers
├── hooks/
│   ├── useCredential.ts     # Check user credential
│   └── useVaultPosition.ts  # Get vault position
└── providers/
    └── Web3Provider.tsx     # wagmi + RainbowKit setup
```

## Root Layout with Providers

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Web3Provider } from '@/providers/Web3Provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nullifier - Privacy-Preserving Accredited Investor Verification',
  description: 'Prove your accreditation status without revealing your income.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
```

## Web3 Provider Setup

```tsx
// providers/Web3Provider.tsx
'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

// Mantle Sepolia chain config
const mantleSepolia = {
  id: 5003,
  name: 'Mantle Sepolia',
  network: 'mantle-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'MNT',
    symbol: 'MNT',
  },
  rpcUrls: {
    default: { http: ['https://rpc.sepolia.mantle.xyz'] },
    public: { http: ['https://rpc.sepolia.mantle.xyz'] },
  },
  blockExplorers: {
    default: { name: 'MantleScan', url: 'https://sepolia.mantlescan.xyz' },
  },
  testnet: true,
} as const;

const config = createConfig(
  getDefaultConfig({
    chains: [mantleSepolia],
    transports: {
      [mantleSepolia.id]: http(),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
    appName: 'Nullifier',
    appDescription: 'Privacy-Preserving Accredited Investor Verification',
  })
);

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="auto" mode="light">
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## Page Patterns

### Landing Page

```tsx
// app/page.tsx
import Link from 'next/link';
import { WalletConnect } from '@/components/WalletConnect';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold">NULLIFIER</span>
          <WalletConnect />
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Prove You're Accredited
            <br />
            <span className="text-muted-foreground">Without Revealing Your Income</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Access compliant yield on Mantle using zero-knowledge proofs. 
            Verify once, access everywhere, expose nothing.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/verify">Get Verified</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/vault">View Vaults</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Connect Wallet', desc: 'Link your wallet to Mantle Sepolia' },
              { step: '2', title: 'Link Bank', desc: 'Securely connect via Plaid (read-only)' },
              { step: '3', title: 'Generate Proof', desc: 'ZK proof created locally' },
              { step: '4', title: 'Access Vaults', desc: 'Deposit into compliant yield' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
```

### Verification Page

```tsx
// app/verify/page.tsx
'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ProofGenerator } from '@/components/ProofGenerator';
import { useCredential } from '@/hooks/useCredential';
import { WalletConnect } from '@/components/WalletConnect';

export default function VerifyPage() {
  const { isConnected } = useAccount();
  const { hasCredential, isLoading } = useCredential();
  const router = useRouter();

  // Redirect if already verified
  useEffect(() => {
    if (hasCredential && !isLoading) {
      router.push('/vault');
    }
  }, [hasCredential, isLoading, router]);

  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold">NULLIFIER</span>
          <WalletConnect />
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-center mb-2">
            Verify Your Status
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Prove you're an accredited investor using bank data
          </p>

          {!isConnected ? (
            <div className="rounded-lg border p-8 text-center">
              <p className="mb-4">Connect your wallet to continue</p>
              <WalletConnect />
            </div>
          ) : isLoading ? (
            <div className="rounded-lg border p-8 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            </div>
          ) : (
            <div className="rounded-lg border p-6">
              <ProofGenerator />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
```

## Custom Hooks

### useCredential Hook

```tsx
// hooks/useCredential.ts
import { useAccount, useReadContract } from 'wagmi';
import { NULLIFIER_REGISTRY_ABI, NULLIFIER_REGISTRY_ADDRESS } from '@/lib/contracts';

export function useCredential() {
  const { address } = useAccount();

  const { data: hasCredential, isLoading, refetch } = useReadContract({
    address: NULLIFIER_REGISTRY_ADDRESS,
    abi: NULLIFIER_REGISTRY_ABI,
    functionName: 'hasCredential',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const { data: isAccredited } = useReadContract({
    address: NULLIFIER_REGISTRY_ADDRESS,
    abi: NULLIFIER_REGISTRY_ABI,
    functionName: 'isAccredited',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!hasCredential,
    },
  });

  return {
    hasCredential: !!hasCredential,
    isAccredited: !!isAccredited,
    isLoading,
    refetch,
  };
}
```

### useVaultPosition Hook

```tsx
// hooks/useVaultPosition.ts
import { useAccount, useReadContracts } from 'wagmi';
import { formatEther } from 'viem';
import { COMPLIANT_VAULT_ABI, VAULT_ADDRESSES } from '@/lib/contracts';

export function useVaultPosition(vaultAddress: `0x${string}`) {
  const { address } = useAccount();

  const { data, isLoading } = useReadContracts({
    contracts: [
      {
        address: vaultAddress,
        abi: COMPLIANT_VAULT_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
      },
      {
        address: vaultAddress,
        abi: COMPLIANT_VAULT_ABI,
        functionName: 'convertToAssets',
        args: address ? [data?.[0]?.result || 0n] : undefined,
      },
      {
        address: vaultAddress,
        abi: COMPLIANT_VAULT_ABI,
        functionName: 'totalAssets',
      },
    ],
    query: {
      enabled: !!address,
    },
  });

  const shares = data?.[0]?.result || 0n;
  const assets = data?.[1]?.result || 0n;
  const tvl = data?.[2]?.result || 0n;

  return {
    shares: formatEther(shares),
    assets: formatEther(assets),
    tvl: formatEther(tvl),
    isLoading,
  };
}
```

## Component Patterns

### Vault Card

```tsx
// components/VaultCard.tsx
'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useVaultPosition } from '@/hooks/useVaultPosition';
import { useCredential } from '@/hooks/useCredential';
import { COMPLIANT_VAULT_ABI } from '@/lib/contracts';

interface VaultCardProps {
  name: string;
  symbol: string;
  address: `0x${string}`;
  apy: string;
  assetName: string;
}

export function VaultCard({ name, symbol, address, apy, assetName }: VaultCardProps) {
  const { address: userAddress } = useAccount();
  const { isAccredited } = useCredential();
  const { assets, tvl, isLoading } = useVaultPosition(address);
  const [amount, setAmount] = useState('');

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isTxLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleDeposit = () => {
    if (!amount || !userAddress) return;
    
    writeContract({
      address,
      abi: COMPLIANT_VAULT_ABI,
      functionName: 'deposit',
      args: [parseEther(amount), userAddress],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {name}
          <span className="text-sm font-normal text-green-600">{apy} APY</span>
        </CardTitle>
        <CardDescription>
          Deposit {assetName} to earn compliant yield
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* TVL */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Value Locked</span>
          <span className="font-medium">{isLoading ? '...' : `${tvl} ${assetName}`}</span>
        </div>

        {/* User Position */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Your Position</span>
          <span className="font-medium">{isLoading ? '...' : `${assets} ${assetName}`}</span>
        </div>

        {/* Deposit Form */}
        {isAccredited ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button 
                onClick={handleDeposit} 
                disabled={isPending || isTxLoading || !amount}
              >
                {isPending || isTxLoading ? 'Depositing...' : 'Deposit'}
              </Button>
            </div>
            {isSuccess && (
              <p className="text-sm text-green-600">Deposit successful!</p>
            )}
          </div>
        ) : (
          <div className="rounded-md bg-muted p-3 text-sm text-center">
            <p className="text-muted-foreground">
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
```

## API Routes

```tsx
// app/api/plaid/create-link-token/route.ts
import { NextResponse } from 'next/server';
import { createLinkToken } from '@/lib/plaid';

export async function POST(request: Request) {
  try {
    // In production, get userId from session
    const userId = 'demo-user-' + Date.now();
    
    const linkToken = await createLinkToken(userId);
    
    return NextResponse.json({ linkToken });
  } catch (error) {
    console.error('Error creating link token:', error);
    return NextResponse.json(
      { error: 'Failed to create link token' },
      { status: 500 }
    );
  }
}
```

## Loading States Pattern

Always handle loading, error, and empty states:

```tsx
function DataDisplay() {
  const { data, isLoading, error } = useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-destructive/10 p-4 text-destructive">
        <p className="font-medium">Something went wrong</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No data found</p>
      </div>
    );
  }

  return <div>{/* Render data */}</div>;
}
```

## Anti-Patterns

❌ **Don't use `any`**
```typescript
// BAD
const handleClick = (data: any) => { ... }

// GOOD
interface ClickData { id: string; value: number }
const handleClick = (data: ClickData) => { ... }
```

❌ **Don't skip loading states**
```tsx
// BAD
const { data } = useQuery();
return <div>{data.name}</div>; // Crashes if data is undefined

// GOOD
const { data, isLoading } = useQuery();
if (isLoading) return <Spinner />;
if (!data) return <Empty />;
return <div>{data.name}</div>;
```

❌ **Don't use inline styles**
```tsx
// BAD
<div style={{ marginTop: '20px', color: 'blue' }}>

// GOOD
<div className="mt-5 text-blue-500">
```

❌ **Don't forget error boundaries**
```tsx
// Wrap pages/sections with error boundaries
<ErrorBoundary fallback={<ErrorFallback />}>
  <ProofGenerator />
</ErrorBoundary>
```
