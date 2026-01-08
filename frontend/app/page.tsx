"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { WalletConnect } from "@/components/WalletConnect";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
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
  BookOpen,
  Users,
  Eye,
  Clock,
  BadgeCheck,
  Layers,
  RefreshCw,
} from "lucide-react";

// Logo data for marquee
const LOGOS_ROW_1 = [
  "MANTLE", "reclaim", "PLAID", "OpenZeppelin", "wagmi", "FOUNDRY",
  "viem", "ConnectKit", "Next.js", "TypeScript"
];

const LOGOS_ROW_2 = [
  "Tailwind", "React", "Solidity", "ERC-721", "ERC-4626", "zkTLS"
];

// Product features for grid
const PRODUCT_FEATURES = [
  { icon: Fingerprint, title: "ZK Verification", desc: "Prove accreditation without revealing income data" },
  { icon: Building2, title: "Bank Integration", desc: "Secure read-only access via Plaid" },
  { icon: FileCheck, title: "Credential Minting", desc: "Soulbound NFT on Mantle chain" },
  { icon: Wallet, title: "Compliant Vaults", desc: "SEC-compliant ERC-4626 yield vaults" },
  { icon: Clock, title: "1-Year Validity", desc: "Credentials expire and can be renewed" },
  { icon: Users, title: "Multi-Type Support", desc: "Income, net worth, or both verified" },
  { icon: Eye, title: "Privacy First", desc: "Zero knowledge of actual amounts" },
  { icon: RefreshCw, title: "Instant Withdrawals", desc: "Exit positions anytime, no lock-ups" },
  { icon: Layers, title: "RWA Access", desc: "Unlock tokenized securities" },
  { icon: BadgeCheck, title: "Revocation", desc: "Admin can revoke compromised credentials" },
];

export default function HomePage() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Scroll animation hooks
  const { ref: productGridRef, isVisible: productGridVisible } = useScrollAnimation();
  const { ref: featureRef1, isVisible: feature1Visible } = useScrollAnimation();
  const { ref: featureRef2, isVisible: feature2Visible } = useScrollAnimation();
  const { ref: privacyRef, isVisible: privacyVisible } = useScrollAnimation();
  const { ref: testimonialRef, isVisible: testimonialVisible } = useScrollAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Announcement Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient" style={{ backgroundSize: "200% 200%" }} />
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
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center transition-transform group-hover:scale-105">
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
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "product" ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 transition-all duration-200 origin-top ${openDropdown === "product" ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                <div className="grid grid-cols-3 gap-6">
                  {/* Features Column */}
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Fingerprint, title: "ZK Verification", desc: "Prove accreditation without revealing income", href: "/verify" },
                        { icon: Wallet, title: "Compliant Vaults", desc: "SEC-compliant ERC-4626 yield vaults", href: "/vault" },
                        { icon: Building2, title: "Bank Integration", desc: "Secure read-only access via Plaid", href: "/verify" },
                        { icon: FileCheck, title: "Soulbound Credentials", desc: "Non-transferable on-chain attestations", href: "/verify" },
                        { icon: PieChart, title: "Portfolio Access", desc: "Unlock tokenized securities and RWAs", href: "/vault" },
                        { icon: ArrowRightLeft, title: "Instant Withdrawals", desc: "Exit positions anytime, no restrictions", href: "/vault" },
                      ].map((item, idx) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group hover-lift"
                          style={{ transitionDelay: `${idx * 30}ms` }}
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
                      <Link href="/verify" className="flex-1 text-xs bg-gray-900 text-white rounded-lg py-2 text-center hover:bg-gray-800 transition-colors">
                        Start
                      </Link>
                      <button className="flex-1 text-xs bg-white text-gray-700 rounded-lg py-2 border border-gray-200 hover:bg-gray-50 transition-colors">
                        Learn more
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Use Cases Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("customers")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Use Cases
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "customers" ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-2 transition-all duration-200 origin-top ${openDropdown === "customers" ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                {[
                  { title: "RWA Platforms", desc: "Gate access to tokenized securities" },
                  { title: "DeFi Protocols", desc: "Compliant yield for institutions" },
                  { title: "Fund Managers", desc: "Streamline investor onboarding" },
                ].map((item, idx) => (
                  <a
                    key={item.title}
                    href="#"
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    style={{ transitionDelay: `${idx * 30}ms` }}
                  >
                    <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                  </a>
                ))}
              </div>
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
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "resources" ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-2 transition-all duration-200 origin-top ${openDropdown === "resources" ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                {[
                  { icon: Globe, title: "GitHub", desc: "View source code", href: "https://github.com/Miny-Labs/Nullifier" },
                  { icon: Fingerprint, title: "Reclaim Protocol", desc: "ZK proof infrastructure", href: "https://reclaimprotocol.org" },
                  { icon: Building2, title: "Plaid", desc: "Bank data connectivity", href: "https://plaid.com" },
                  { icon: BookOpen, title: "Mantle Docs", desc: "Chain documentation", href: "https://docs.mantle.xyz" },
                ].map((item, idx) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    className="flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    style={{ transitionDelay: `${idx * 30}ms` }}
                  >
                    <item.icon className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
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
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-cyan-100/40 via-transparent to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-100/40 via-transparent to-transparent rounded-full blur-3xl" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-pink-50/30 via-transparent to-cyan-50/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              {/* Eyebrow */}
              <p className={`text-gray-500 text-sm md:text-base mb-4 ${mounted ? "animate-fade-in-up" : "opacity-0"}`}>
                ZK-KYC &amp; Compliant Yield for Mantle&apos;s RWA Ecosystem
              </p>

              {/* Headline */}
              <h1 className={`font-serif text-4xl md:text-5xl lg:text-[56px] text-gray-900 leading-[1.1] tracking-tight mb-6 ${mounted ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`} style={{ animationDelay: "100ms", animationFillMode: "backwards" }}>
                Prove You&apos;re Accredited
                <br />
                <span className="text-gray-400">Without Revealing Income</span>
              </h1>

              {/* Description */}
              <p className={`text-gray-500 text-lg leading-relaxed mb-8 ${mounted ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "200ms", animationFillMode: "backwards" }}>
                Nullifier uses zero-knowledge proofs to verify your accredited
                investor status from real bank data. Verify once, access
                compliant yield everywhere, expose nothing.
              </p>

              {/* CTAs */}
              <div className={`flex flex-wrap gap-4 ${mounted ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "300ms", animationFillMode: "backwards" }}>
                <Link
                  href="/verify"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Get Verified
                </Link>
                <Link
                  href="/vault"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                >
                  View Vaults
                </Link>
              </div>
            </div>

            {/* Right - Product Mockup */}
            <div className={`relative ${mounted ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "400ms", animationFillMode: "backwards" }}>
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-float-slow">
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
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover-lift">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Connect Wallet</div>
                        <div className="text-xs text-gray-500">Mantle Sepolia</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover-lift">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Link Bank Account</div>
                        <div className="text-xs text-gray-500">Via Plaid (read-only)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-cyan-50 rounded-xl border-2 border-cyan-200">
                      <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center animate-pulse-glow">
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Generating ZK Proof...</div>
                        <div className="text-xs text-cyan-600">Income &ge; $200K verified</div>
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
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl blur-2xl opacity-20 animate-float" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur-2xl opacity-20 animate-float" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud Section with Marquee */}
      <section className="py-16 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* G2 Rating */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="w-6 h-6 rounded bg-[#ff492c] flex items-center justify-center text-white text-xs font-bold">
              G
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Logo Row 1 - Marquee */}
          <div className="marquee-container mb-6">
            <div className="marquee-content">
              {[...LOGOS_ROW_1, ...LOGOS_ROW_1].map((logo, i) => (
                <span key={`row1-${i}`} className="text-xl font-bold tracking-wider text-gray-400 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity cursor-default">
                  {logo}
                </span>
              ))}
            </div>
          </div>

          {/* Logo Row 2 - Reverse Marquee */}
          <div className="marquee-container">
            <div className="marquee-content" style={{ animationDirection: "reverse", animationDuration: "35s" }}>
              {[...LOGOS_ROW_2, ...LOGOS_ROW_2, ...LOGOS_ROW_2].map((logo, i) => (
                <span key={`row2-${i}`} className="text-lg font-medium text-gray-400 whitespace-nowrap opacity-40 hover:opacity-80 transition-opacity cursor-default">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Suite Section */}
      <section className="py-20 bg-gray-50/50 relative overflow-hidden">
        {/* Decorative dotted pattern */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full dotted-pattern opacity-50" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="mb-16">
            <p className="text-gray-500 text-sm mb-3">Nullifier Product Suite</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
              Get to Know Nullifier
            </h2>
            <p className="text-gray-500 max-w-2xl">
              Privacy-first accredited investor verification. The only platform that lets you prove your status without exposing your wealth.
            </p>
          </div>

          <div
            ref={productGridRef}
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
          >
            {PRODUCT_FEATURES.map((feature, idx) => (
              <div
                key={feature.title}
                className={`group p-4 rounded-xl bg-white border border-gray-100 hover-lift transition-all duration-300 ${productGridVisible ? "animate-on-scroll animate-in" : "animate-on-scroll"}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-cyan-100 transition-colors">
                  <feature.icon className="w-5 h-5 text-gray-600 group-hover:text-cyan-600 transition-colors" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section 1: ZK Verification */}
      <section className="py-20 relative overflow-hidden">
        {/* Decorative concentric circles */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] concentric-pattern opacity-30" />

        <div className="max-w-7xl mx-auto px-6">
          <div
            ref={featureRef1}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Left: Text */}
            <div className={`${feature1Visible ? "animate-on-scroll animate-in" : "animate-on-scroll"}`}>
              <p className="text-cyan-600 text-sm font-medium mb-3">ZK Verification</p>
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
                Turn bank data into<br />
                <span className="text-gray-400">private credentials</span>
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Connect your bank via Plaid, we extract income data locally, generate a ZK proof that you meet the threshold, and mint a soulbound credential on Mantle.
              </p>
              <ul className="space-y-4">
                {[
                  { label: "Automate verification", desc: "No more CPA letters or manual reviews" },
                  { label: "Stay in control", desc: "Your data never leaves your device" },
                  { label: "Instant access", desc: "Unlock vaults in seconds, not days" },
                ].map((item, idx) => (
                  <li
                    key={item.label}
                    className={`flex items-start gap-3 ${feature1Visible ? "animate-on-scroll animate-in" : "animate-on-scroll"}`}
                    style={{ transitionDelay: `${200 + idx * 100}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">{item.label}</span>
                      <span className="text-gray-500"> - {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Mockup */}
            <div className={`relative ${feature1Visible ? "animate-on-scroll animate-in" : "animate-on-scroll"}`} style={{ transitionDelay: "300ms" }}>
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 relative">
                {/* Document mockup */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="text-xs font-medium text-gray-400 mb-4 uppercase tracking-wider">
                    ZK Proof Generation
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                      <span className="text-sm text-gray-600">Bank Connected</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                      <span className="text-sm text-gray-600">Income Extracted</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border-2 border-cyan-200">
                      <span className="text-sm text-cyan-700 font-medium">Threshold: $200,000+</span>
                      <span className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-full">VERIFIED</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 opacity-50">
                      <span className="text-sm text-gray-400">Actual Income</span>
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Proof ready to mint
                  </div>
                </div>

                {/* Side floating card */}
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-xl shadow-lg border border-gray-100 p-3 animate-float-slow">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-900">zkTLS</div>
                      <div className="text-xs text-gray-500">Reclaim Protocol</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Compliant Vaults (Reversed) */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* 3D-style gradient background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div
            ref={featureRef2}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Left: Mockup */}
            <div className={`relative order-2 lg:order-1 ${feature2Visible ? "animate-on-scroll animate-in" : "animate-on-scroll"}`} style={{ transitionDelay: "300ms" }}>
              {/* Vault cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "mETH Vault", apy: "4.2%", tvl: "$2.4M" },
                  { name: "cmETH Vault", apy: "5.1%", tvl: "$1.8M" },
                ].map((vault, idx) => (
                  <div
                    key={vault.name}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover-lift transition-all duration-300"
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-white font-medium text-sm">{vault.name}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">APY</span>
                        <span className="text-green-400 font-medium">{vault.apy}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">TVL</span>
                        <span className="text-white">{vault.tvl}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
                      Deposit
                    </button>
                  </div>
                ))}
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg animate-float">
                SEC Compliant
              </div>
            </div>

            {/* Right: Text */}
            <div className={`order-1 lg:order-2 ${feature2Visible ? "animate-on-scroll animate-in" : "animate-on-scroll"}`}>
              <p className="text-cyan-400 text-sm font-medium mb-3">Compliant Vaults</p>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
                Access yield opportunities<br />
                <span className="text-gray-400">reserved for accredited investors</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Once verified, deposit into ERC-4626 compliant vaults. Earn yield on mETH and cmETH with instant withdrawals. No lock-ups, full control.
              </p>
              <Link
                href="/vault"
                className="inline-flex items-center gap-2 text-white bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                Explore Vaults
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
              Privacy by Design
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              See exactly what gets proven on-chain versus what stays completely private
            </p>
          </div>

          <div
            ref={privacyRef}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div className={`bg-green-50 rounded-2xl p-8 border border-green-100 hover-lift ${privacyVisible ? "animate-on-scroll animate-in" : "animate-on-scroll"}`}>
              <h3 className="text-lg font-semibold text-green-800 mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Proven On-Chain
              </h3>
              <ul className="space-y-4">
                {[
                  "Income meets $200K threshold",
                  "Verification timestamp",
                  "Attestor signature",
                ].map((item, idx) => (
                  <li
                    key={item}
                    className={`flex items-center gap-3 text-green-700 ${privacyVisible ? "animate-on-scroll animate-in" : "animate-on-scroll"}`}
                    style={{ transitionDelay: `${200 + idx * 100}ms` }}
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`bg-gray-900 rounded-2xl p-8 hover-lift ${privacyVisible ? "animate-on-scroll animate-in" : "animate-on-scroll"}`} style={{ transitionDelay: "150ms" }}>
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
                ].map((item, idx) => (
                  <li
                    key={item}
                    className={`flex items-center gap-3 text-gray-300 ${privacyVisible ? "animate-on-scroll animate-in" : "animate-on-scroll"}`}
                    style={{ transitionDelay: `${350 + idx * 100}ms` }}
                  >
                    <Lock className="w-4 h-4 flex-shrink-0 text-gray-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial/Trust Section */}
      <section className="py-20 bg-gradient-to-b from-cyan-50 to-white relative overflow-hidden">
        {/* Decorative concentric circles */}
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-20">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="8 8" />
            <circle cx="200" cy="200" r="140" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="8 8" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="8 8" />
            <circle cx="200" cy="200" r="60" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="8 8" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Tabs */}
          <div className="flex items-center gap-6 mb-12">
            {["Mantle", "Reclaim", "Plaid"].map((company, idx) => (
              <button
                key={company}
                className={`text-lg font-semibold transition-colors ${idx === 0 ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
              >
                {company}
              </button>
            ))}
          </div>

          <div
            ref={testimonialRef}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Quote */}
            <div className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 ${testimonialVisible ? "animate-on-scroll animate-in" : "animate-on-scroll"}`}>
              <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mb-6 leading-tight">
                Why Mantle is the perfect home for privacy-preserving RWA access
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <div className="font-medium text-gray-900">Mantle Network</div>
                  <div className="text-sm text-gray-500">L2 Blockchain</div>
                </div>
              </div>
              <Link
                href="https://docs.mantle.xyz"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
              >
                Learn more about Mantle
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right: Logo/Visual */}
            <div className={`flex items-center justify-center ${testimonialVisible ? "animate-on-scroll animate-in" : "animate-on-scroll"}`} style={{ transitionDelay: "200ms" }}>
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-100 to-purple-100 flex items-center justify-center">
                  <div className="text-6xl font-bold text-gray-900 font-serif">M</div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan-400" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 animate-gradient" style={{ backgroundSize: "200% 200%" }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Ready to Get Verified?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join the future of compliant DeFi. Verify once, access everywhere.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/verify"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Start Verification
            </Link>
            <a
              href="https://github.com/Miny-Labs/Nullifier"
              target="_blank"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white text-sm font-medium rounded-full border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:scale-105"
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
