"use client";

import Link from "next/link";
import { useState } from "react";
import { WalletConnect } from "@/components/WalletConnect";
import {
  ChevronDown,
  ChevronRight,
  Play,
  Shield,
  Lock,
  Zap,
  CheckCircle,
  Fingerprint,
  Wallet,
  Building2,
  FileCheck,
  PieChart,
  ArrowRightLeft,
  Globe,
  BookOpen
} from "lucide-react";

export default function HomePage() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Announcement Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
        <div className="relative px-4 py-3 text-center">
          <a
            href="https://github.com/Miny-Labs/Nullifier"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Introducing Nullifier: Privacy-preserving accredited investor verification for Mantle.
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Nullifier</span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Product Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("product")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Product
                <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === "product" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Features Column */}
                    <div className="col-span-2">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            icon: Fingerprint,
                            title: "ZK Verification",
                            desc: "Prove accreditation without revealing income",
                            href: "/verify"
                          },
                          {
                            icon: Wallet,
                            title: "Compliant Vaults",
                            desc: "SEC-compliant ERC-4626 yield vaults",
                            href: "/vault"
                          },
                          {
                            icon: Building2,
                            title: "Bank Integration",
                            desc: "Secure read-only access via Plaid",
                            href: "/verify"
                          },
                          {
                            icon: FileCheck,
                            title: "Soulbound Credentials",
                            desc: "Non-transferable on-chain attestations",
                            href: "/verify"
                          },
                          {
                            icon: PieChart,
                            title: "Portfolio Access",
                            desc: "Unlock tokenized securities and RWAs",
                            href: "/vault"
                          },
                          {
                            icon: ArrowRightLeft,
                            title: "Instant Withdrawals",
                            desc: "Exit positions anytime, no restrictions",
                            href: "/vault"
                          },
                        ].map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                              <item.icon className="w-5 h-5 text-gray-600 group-hover:text-cyan-600 transition-colors" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Preview Card */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded bg-cyan-500 flex items-center justify-center">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium">Nullifier</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mb-2">
                        Verify Your Status
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                          Income threshold met
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                          ZK proof generated
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                          Mint credential
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 text-xs bg-gray-900 text-white rounded-lg py-2 hover:bg-gray-800 transition-colors">
                          Start
                        </button>
                        <button className="flex-1 text-xs bg-white text-gray-700 rounded-lg py-2 border border-gray-200 hover:bg-gray-50 transition-colors">
                          Learn more
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Customers Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("customers")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Use Cases
                <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === "customers" && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-2">
                  <a href="#" className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900 text-sm">RWA Platforms</div>
                    <div className="text-xs text-gray-500 mt-0.5">Gate access to tokenized securities</div>
                  </a>
                  <a href="#" className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900 text-sm">DeFi Protocols</div>
                    <div className="text-xs text-gray-500 mt-0.5">Compliant yield for institutions</div>
                  </a>
                  <a href="#" className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900 text-sm">Fund Managers</div>
                    <div className="text-xs text-gray-500 mt-0.5">Streamline investor onboarding</div>
                  </a>
                </div>
              )}
            </div>

            <Link href="https://docs.mantle.xyz" target="_blank" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Docs
            </Link>

            <Link href="#" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("resources")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Resources
                <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === "resources" && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-2">
                  <a href="https://github.com/Miny-Labs/Nullifier" target="_blank" className="flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">GitHub</div>
                      <div className="text-xs text-gray-500 mt-0.5">View source code</div>
                    </div>
                  </a>
                  <a href="https://reclaimprotocol.org" target="_blank" className="flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Fingerprint className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Reclaim Protocol</div>
                      <div className="text-xs text-gray-500 mt-0.5">ZK proof infrastructure</div>
                    </div>
                  </a>
                  <a href="https://plaid.com" target="_blank" className="flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Plaid</div>
                      <div className="text-xs text-gray-500 mt-0.5">Bank data connectivity</div>
                    </div>
                  </a>
                  <a href="https://docs.mantle.xyz" target="_blank" className="flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <BookOpen className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Mantle Docs</div>
                      <div className="text-xs text-gray-500 mt-0.5">Chain documentation</div>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Link href="/verify" className="hidden sm:inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Sign in
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-purple-50" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-cyan-100/40 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-100/40 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-pink-50/30 via-transparent to-cyan-50/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              {/* Eyebrow */}
              <p className="text-gray-500 text-sm md:text-base mb-4">
                ZK-KYC & Compliant Yield for Mantle&apos;s RWA Ecosystem
              </p>

              {/* Headline */}
              <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] text-gray-900 leading-[1.1] tracking-tight mb-6">
                Prove You&apos;re Accredited
                <br />
                <span className="text-gray-400">Without Revealing Income</span>
              </h1>

              {/* Description */}
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Nullifier uses zero-knowledge proofs to verify your accredited
                investor status from real bank data. Verify once, access
                compliant yield everywhere, expose nothing.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/verify"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
                >
                  Get Verified
                </Link>
                <Link
                  href="/vault"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  View Vaults
                </Link>
              </div>
            </div>

            {/* Right - Product Mockup */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-100 rounded-md px-3 py-1.5 text-xs text-gray-500 text-center">
                      nullifier.xyz/verify
                    </div>
                  </div>
                </div>

                {/* App Preview */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                  {/* Steps Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Connect Wallet</div>
                        <div className="text-xs text-gray-500">Mantle Sepolia</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Link Bank Account</div>
                        <div className="text-xs text-gray-500">Via Plaid (read-only)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-cyan-50 rounded-xl border-2 border-cyan-200">
                      <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center animate-pulse">
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Generating ZK Proof...</div>
                        <div className="text-xs text-cyan-600">Income ≥ $200K verified</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 opacity-50">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-400">Mint Credential</div>
                        <div className="text-xs text-gray-400">Soulbound NFT</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/5 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl blur-2xl opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur-2xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud Section */}
      <section className="py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* G2 Rating */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-6 h-6 rounded bg-[#ff492c] flex items-center justify-center text-white text-xs font-bold">
              G
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Logo Row 1 */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-6 opacity-60">
            <span className="text-xl font-bold tracking-wider text-gray-400">MANTLE</span>
            <span className="text-xl font-semibold text-gray-400">reclaim</span>
            <span className="text-xl font-bold tracking-wide text-gray-400">PLAID</span>
            <span className="text-xl font-bold text-gray-400">OpenZeppelin</span>
            <span className="text-xl font-semibold text-gray-400">wagmi</span>
            <span className="text-xl font-bold tracking-wider text-gray-400">FOUNDRY</span>
          </div>

          {/* Logo Row 2 */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40">
            <span className="text-lg font-medium text-gray-400">ConnectKit</span>
            <span className="text-lg font-bold text-gray-400">viem</span>
            <span className="text-lg font-medium text-gray-400">Next.js</span>
            <span className="text-lg font-semibold text-gray-400">Tailwind</span>
            <span className="text-lg font-medium text-gray-400">TypeScript</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="steps" className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Four simple steps to get verified and access compliant yield opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Connect Wallet",
                desc: "Link your wallet to Mantle Sepolia testnet",
                icon: "🔗",
              },
              {
                step: "02",
                title: "Link Bank",
                desc: "Securely connect via Plaid (read-only access)",
                icon: "🏦",
              },
              {
                step: "03",
                title: "Generate Proof",
                desc: "ZK proof created locally, nothing leaves your device",
                icon: "🔐",
              },
              {
                step: "04",
                title: "Access Vaults",
                desc: "Deposit into compliant yield opportunities",
                icon: "💰",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-xs font-medium text-cyan-600 mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
              Privacy by Design
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              See exactly what gets proven on-chain versus what stays completely private
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
              <h3 className="text-lg font-semibold text-green-800 mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Proven On-Chain
              </h3>
              <ul className="space-y-4">
                {[
                  "Income meets $200K threshold",
                  "Verification timestamp",
                  "Attestor signature",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-green-700">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Stays Private
              </h3>
              <ul className="space-y-4">
                {[
                  "Actual income amount",
                  "Bank account details",
                  "Transaction history",
                  "Personal documents",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300">
                    <Lock className="w-4 h-4 flex-shrink-0 text-gray-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Ready to Get Verified?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join the future of compliant DeFi. Verify once, access everywhere.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/verify"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Start Verification
            </Link>
            <a
              href="https://github.com/Miny-Labs/Nullifier"
              target="_blank"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white text-sm font-medium rounded-full border border-gray-700 hover:border-gray-500 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-black flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Nullifier</span>
            </div>
            <p className="text-sm text-gray-500">
              Built for Mantle Global Hackathon 2025
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="https://reclaimprotocol.org" target="_blank" className="hover:text-gray-900 transition-colors">
                Reclaim Protocol
              </a>
              <a href="https://plaid.com" target="_blank" className="hover:text-gray-900 transition-colors">
                Plaid
              </a>
              <a href="https://mantle.xyz" target="_blank" className="hover:text-gray-900 transition-colors">
                Mantle
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
