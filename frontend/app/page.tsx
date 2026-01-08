import Link from "next/link";
import { WalletConnect } from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";

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
      <section className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Prove You&apos;re Accredited
            <br />
            <span className="text-muted-foreground">
              Without Revealing Your Income
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Access compliant yield on Mantle using zero-knowledge proofs. Verify
            once, access everywhere, expose nothing.
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
              {
                step: "1",
                title: "Connect Wallet",
                desc: "Link your wallet to Mantle Sepolia",
              },
              {
                step: "2",
                title: "Link Bank",
                desc: "Securely connect via Plaid (read-only)",
              },
              {
                step: "3",
                title: "Generate Proof",
                desc: "ZK proof created locally",
              },
              {
                step: "4",
                title: "Access Vaults",
                desc: "Deposit into compliant yield",
              },
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

      {/* Privacy section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">
            What Gets Proven vs. What Stays Private
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg border bg-green-50 dark:bg-green-950/20 p-6">
              <h3 className="font-semibold text-green-700 dark:text-green-400 mb-4">
                Proven On-Chain
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Income ≥ $200,000 threshold
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Verification timestamp
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Attestor signature
                </li>
              </ul>
            </div>
            <div className="rounded-lg border bg-red-50 dark:bg-red-950/20 p-6">
              <h3 className="font-semibold text-red-700 dark:text-red-400 mb-4">
                Stays Private
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Actual income amount
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Bank account details
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Transaction history
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Personal documents
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built for Mantle Global Hackathon 2025</p>
          <p className="mt-2">
            Powered by{" "}
            <a
              href="https://reclaimprotocol.org"
              className="underline hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reclaim Protocol
            </a>{" "}
            &{" "}
            <a
              href="https://plaid.com"
              className="underline hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Plaid
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
