"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WalletConnect } from "@/components/WalletConnect";
import {
  ShieldCheck,
  LockKey,
  Lightning,
  CheckCircle,
  Fingerprint,
  Wallet,
  Buildings,
  Certificate,
  ChartPie,
  ArrowsLeftRight,
  GlobeSimple,
  BookOpen,
  Users,
  Eye,
  Clock,
  SealCheck,
  Stack,
  ArrowsClockwise,
  CaretDown,
  CaretRight,
  Play,
} from "@phosphor-icons/react";
import {
  MantleLogo,
  ReclaimLogo,
  PlaidLogo,
  OpenZeppelinLogo,
  ReactLogo,
  NextjsLogo,
  TypeScriptLogo,
  TailwindLogo,
  SolidityLogo,
  FoundryLogo,
  WagmiLogo,
  ViemLogo,
  ConnectKitLogo,
} from "@/components/logos";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// Logo data for marquee
const LOGO_COMPONENTS_ROW_1 = [
  { name: "Mantle", Logo: MantleLogo },
  { name: "Reclaim", Logo: ReclaimLogo },
  { name: "Plaid", Logo: PlaidLogo },
  { name: "OpenZeppelin", Logo: OpenZeppelinLogo },
  { name: "wagmi", Logo: WagmiLogo },
  { name: "Foundry", Logo: FoundryLogo },
  { name: "viem", Logo: ViemLogo },
  { name: "ConnectKit", Logo: ConnectKitLogo },
  { name: "Next.js", Logo: NextjsLogo },
  { name: "TypeScript", Logo: TypeScriptLogo },
];

const LOGO_COMPONENTS_ROW_2 = [
  { name: "Tailwind", Logo: TailwindLogo },
  { name: "React", Logo: ReactLogo },
  { name: "Solidity", Logo: SolidityLogo },
];

// Product features for grid
const PRODUCT_FEATURES = [
  { icon: Fingerprint, title: "ZK Verification", desc: "Prove accreditation without revealing income data" },
  { icon: Buildings, title: "Bank Integration", desc: "Secure read-only access via Plaid" },
  { icon: Certificate, title: "Credential Minting", desc: "Soulbound NFT on Mantle chain" },
  { icon: Wallet, title: "Compliant Vaults", desc: "SEC-compliant ERC-4626 yield vaults" },
  { icon: Clock, title: "1-Year Validity", desc: "Credentials expire and can be renewed" },
  { icon: Users, title: "Multi-Type Support", desc: "Income, net worth, or both verified" },
  { icon: Eye, title: "Privacy First", desc: "Zero knowledge of actual amounts" },
  { icon: ArrowsClockwise, title: "Instant Withdrawals", desc: "Exit positions anytime, no lock-ups" },
  { icon: Stack, title: "RWA Access", desc: "Unlock tokenized securities" },
  { icon: SealCheck, title: "Revocation", desc: "Admin can revoke compromised credentials" },
];

// Scroll animation component
function AnimatedSection({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Announcement Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient" style={{ backgroundSize: "200% 200%" }} />
        <div className="relative px-4 py-3 text-center">
          <a
            href="https://github.com/Miny-Labs/Nullifier"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Introducing Nullifier: Privacy-preserving accredited investor verification for Mantle.
            <CaretRight className="w-4 h-4" weight="bold" />
          </a>
        </div>
      </motion.div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="w-8 h-8 rounded-lg bg-black flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShieldCheck className="w-5 h-5 text-white" weight="duotone" />
            </motion.div>
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
                <CaretDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "product" ? "rotate-180" : ""}`} weight="bold" />
              </button>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{
                  opacity: openDropdown === "product" ? 1 : 0,
                  scale: openDropdown === "product" ? 1 : 0.95,
                  y: openDropdown === "product" ? 0 : -10
                }}
                transition={{ duration: 0.2 }}
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 ${openDropdown === "product" ? "visible" : "invisible pointer-events-none"}`}
              >
                <div className="grid grid-cols-3 gap-6">
                  {/* Features Column */}
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Fingerprint, title: "ZK Verification", desc: "Prove accreditation without revealing income", href: "/verify" },
                        { icon: Wallet, title: "Compliant Vaults", desc: "SEC-compliant ERC-4626 yield vaults", href: "/vault" },
                        { icon: Buildings, title: "Bank Integration", desc: "Secure read-only access via Plaid", href: "/verify" },
                        { icon: Certificate, title: "Soulbound Credentials", desc: "Non-transferable on-chain attestations", href: "/verify" },
                        { icon: ChartPie, title: "Portfolio Access", desc: "Unlock tokenized securities and RWAs", href: "/vault" },
                        { icon: ArrowsLeftRight, title: "Instant Withdrawals", desc: "Exit positions anytime, no restrictions", href: "/vault" },
                      ].map((item, idx) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                        >
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-cyan-100 transition-colors"
                            whileHover={{ scale: 1.05 }}
                          >
                            <item.icon className="w-5 h-5 text-gray-600 group-hover:text-cyan-600 transition-colors" weight="duotone" />
                          </motion.div>
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
                        <ShieldCheck className="w-4 h-4 text-white" weight="fill" />
                      </div>
                      <span className="text-sm font-medium">Nullifier</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mb-2">
                      Verify Your Status
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" weight="fill" />
                        Income threshold met
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" weight="fill" />
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
              </motion.div>
            </div>

            {/* Use Cases Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("customers")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Use Cases
                <CaretDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "customers" ? "rotate-180" : ""}`} weight="bold" />
              </button>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{
                  opacity: openDropdown === "customers" ? 1 : 0,
                  scale: openDropdown === "customers" ? 1 : 0.95,
                  y: openDropdown === "customers" ? 0 : -10
                }}
                transition={{ duration: 0.2 }}
                className={`absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-2 ${openDropdown === "customers" ? "visible" : "invisible pointer-events-none"}`}
              >
                {[
                  { title: "RWA Platforms", desc: "Gate access to tokenized securities" },
                  { title: "DeFi Protocols", desc: "Compliant yield for institutions" },
                  { title: "Fund Managers", desc: "Streamline investor onboarding" },
                ].map((item) => (
                  <a
                    key={item.title}
                    href="#"
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                  </a>
                ))}
              </motion.div>
            </div>

            <Link href="https://docs.mantle.xyz" target="_blank" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Docs
            </Link>

            <Link href="#pricing" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
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
                <CaretDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "resources" ? "rotate-180" : ""}`} weight="bold" />
              </button>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{
                  opacity: openDropdown === "resources" ? 1 : 0,
                  scale: openDropdown === "resources" ? 1 : 0.95,
                  y: openDropdown === "resources" ? 0 : -10
                }}
                transition={{ duration: 0.2 }}
                className={`absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-2 ${openDropdown === "resources" ? "visible" : "invisible pointer-events-none"}`}
              >
                {[
                  { icon: GlobeSimple, title: "GitHub", desc: "View source code", href: "https://github.com/Miny-Labs/Nullifier" },
                  { icon: Fingerprint, title: "Reclaim Protocol", desc: "ZK proof infrastructure", href: "https://reclaimprotocol.org" },
                  { icon: Buildings, title: "Plaid", desc: "Bank data connectivity", href: "https://plaid.com" },
                  { icon: BookOpen, title: "Mantle Docs", desc: "Chain documentation", href: "https://docs.mantle.xyz" },
                ].map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    className="flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <item.icon className="w-5 h-5 text-gray-400 mt-0.5" weight="duotone" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                    </div>
                  </a>
                ))}
              </motion.div>
            </div>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Link href="/verify" className="hidden sm:inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Sign in
              <CaretRight className="w-4 h-4 ml-1" weight="bold" />
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
          <motion.div
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-cyan-100/40 via-transparent to-transparent rounded-full blur-3xl"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-100/40 via-transparent to-transparent rounded-full blur-3xl"
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-pink-50/30 via-transparent to-cyan-50/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-gray-500 text-sm md:text-base mb-4"
              >
                ZK-KYC &amp; Compliant Yield for Mantle&apos;s RWA Ecosystem
              </motion.p>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl lg:text-[56px] text-gray-900 leading-[1.1] tracking-tight mb-6"
              >
                Prove You&apos;re Accredited
                <br />
                <span className="text-gray-400">Without Revealing Income</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-500 text-lg leading-relaxed mb-8"
              >
                Nullifier uses zero-knowledge proofs to verify your accredited
                investor status from real bank data. Verify once, access
                compliant yield everywhere, expose nothing.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/verify"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Get Verified
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/vault"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                  >
                    View Vaults
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right - Product Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <motion.div
                className="relative bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
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
                    <motion.div
                      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" weight="fill" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Connect Wallet</div>
                        <div className="text-xs text-gray-500">Mantle Sepolia</div>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" weight="fill" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Link Bank Account</div>
                        <div className="text-xs text-gray-500">Via Plaid (read-only)</div>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-4 p-4 bg-cyan-50 rounded-xl border-2 border-cyan-200"
                      animate={{
                        boxShadow: ["0 0 0 0 rgba(6, 182, 212, 0.4)", "0 0 20px 5px rgba(6, 182, 212, 0.2)", "0 0 0 0 rgba(6, 182, 212, 0.4)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">
                        <LockKey className="w-5 h-5 text-white" weight="fill" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Generating ZK Proof...</div>
                        <div className="text-xs text-cyan-600">Income &ge; $200K verified</div>
                      </div>
                    </motion.div>
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 opacity-50">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Lightning className="w-5 h-5 text-gray-400" weight="duotone" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-400">Mint Credential</div>
                        <div className="text-xs text-gray-400">Soulbound NFT</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Play Button Overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/5 transition-colors cursor-pointer"
                  whileHover="hover"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30"
                    variants={{
                      hover: { scale: 1.1 }
                    }}
                  >
                    <Play className="w-6 h-6 text-white ml-1" weight="fill" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl blur-2xl opacity-20"
                animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur-2xl opacity-20"
                animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logo Cloud Section with Real SVG Logos */}
      <section className="py-16 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-sm text-gray-500 mb-2">Built with industry-leading technologies</p>
            <div className="flex items-center justify-center gap-2">
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
          </motion.div>

          {/* Logo Row 1 - Marquee with real SVG logos */}
          <div className="marquee-container mb-6">
            <motion.div
              className="flex gap-12 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...LOGO_COMPONENTS_ROW_1, ...LOGO_COMPONENTS_ROW_1].map((item, i) => (
                <motion.div
                  key={`row1-${i}`}
                  className="flex items-center gap-2 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                >
                  <item.Logo size={28} className="text-gray-400 opacity-60 hover:opacity-100 transition-opacity" />
                  <span className="text-sm font-medium text-gray-400 opacity-60 hover:opacity-100 transition-opacity">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Logo Row 2 - Reverse Marquee */}
          <div className="marquee-container">
            <motion.div
              className="flex gap-16 items-center"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[...LOGO_COMPONENTS_ROW_2, ...LOGO_COMPONENTS_ROW_2, ...LOGO_COMPONENTS_ROW_2, ...LOGO_COMPONENTS_ROW_2].map((item, i) => (
                <motion.div
                  key={`row2-${i}`}
                  className="flex items-center gap-2 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                >
                  <item.Logo size={24} className="text-gray-400 opacity-40 hover:opacity-80 transition-opacity" />
                  <span className="text-sm font-medium text-gray-400 opacity-40 hover:opacity-80 transition-opacity">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Suite Section */}
      <section className="py-20 bg-gray-50/50 relative overflow-hidden">
        {/* Decorative dotted pattern */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full dotted-pattern opacity-50" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <AnimatedSection className="mb-16">
            <p className="text-gray-500 text-sm mb-3">Nullifier Product Suite</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
              Get to Know Nullifier
            </h2>
            <p className="text-gray-500 max-w-2xl">
              Privacy-first accredited investor verification. The only platform that lets you prove your status without exposing your wealth.
            </p>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
          >
            {PRODUCT_FEATURES.map((feature, idx) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
                className="group p-4 rounded-xl bg-white border border-gray-100 transition-all duration-300 cursor-pointer"
              >
                <motion.div
                  className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-cyan-100 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="w-5 h-5 text-gray-600 group-hover:text-cyan-600 transition-colors" weight="duotone" />
                </motion.div>
                <h3 className="font-medium text-gray-900 text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Section 1: ZK Verification */}
      <section className="py-20 relative overflow-hidden">
        {/* Decorative concentric circles */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] concentric-pattern opacity-30" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
            <AnimatedSection>
              <p className="text-cyan-600 text-sm font-medium mb-3">ZK Verification</p>
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
                Turn bank data into<br />
                <span className="text-gray-400">private credentials</span>
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Connect your bank via Plaid, we extract income data locally, generate a ZK proof that you meet the threshold, and mint a soulbound credential on Mantle.
              </p>
              <motion.ul
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {[
                  { label: "Automate verification", desc: "No more CPA letters or manual reviews" },
                  { label: "Stay in control", desc: "Your data never leaves your device" },
                  { label: "Instant access", desc: "Unlock vaults in seconds, not days" },
                ].map((item, idx) => (
                  <motion.li
                    key={item.label}
                    variants={fadeInUp}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" weight="fill" />
                    <div>
                      <span className="font-medium text-gray-900">{item.label}</span>
                      <span className="text-gray-500"> - {item.desc}</span>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatedSection>

            {/* Right: Mockup */}
            <AnimatedSection delay={0.3}>
              <motion.div
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 relative"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Document mockup */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="text-xs font-medium text-gray-400 mb-4 uppercase tracking-wider">
                    ZK Proof Generation
                  </div>
                  <div className="space-y-3">
                    <motion.div
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <span className="text-sm text-gray-600">Bank Connected</span>
                      <CheckCircle className="w-5 h-5 text-green-500" weight="fill" />
                    </motion.div>
                    <motion.div
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-sm text-gray-600">Income Extracted</span>
                      <CheckCircle className="w-5 h-5 text-green-500" weight="fill" />
                    </motion.div>
                    <motion.div
                      className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border-2 border-cyan-200"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-sm text-cyan-700 font-medium">Threshold: $200,000+</span>
                      <span className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-full">VERIFIED</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 opacity-50"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 0.5, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="text-sm text-gray-400">Actual Income</span>
                      <LockKey className="w-5 h-5 text-gray-400" weight="fill" />
                    </motion.div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-green-500"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    Proof ready to mint
                  </div>
                </div>

                {/* Side floating card */}
                <motion.div
                  className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-xl shadow-lg border border-gray-100 p-3"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Lightning className="w-4 h-4 text-green-600" weight="fill" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-900">zkTLS</div>
                      <div className="text-xs text-gray-500">Reclaim Protocol</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Compliant Vaults (Dark Theme) */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* 3D-style gradient background */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Mockup */}
            <AnimatedSection delay={0.3} className="order-2 lg:order-1">
              {/* Vault cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "mETH Vault", apy: "4.2%", tvl: "$2.4M" },
                  { name: "cmETH Vault", apy: "5.1%", tvl: "$1.8M" },
                ].map((vault, idx) => (
                  <motion.div
                    key={vault.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-cyan-400" weight="duotone" />
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
                    <motion.button
                      className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Deposit
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                SEC Compliant
              </motion.div>
            </AnimatedSection>

            {/* Right: Text */}
            <AnimatedSection className="order-1 lg:order-2">
              <p className="text-cyan-400 text-sm font-medium mb-3">Compliant Vaults</p>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
                Access yield opportunities<br />
                <span className="text-gray-400">reserved for accredited investors</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Once verified, deposit into ERC-4626 compliant vaults. Earn yield on mETH and cmETH with instant withdrawals. No lock-ups, full control.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/vault"
                  className="inline-flex items-center gap-2 text-white bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
                >
                  Explore Vaults
                  <CaretRight className="w-4 h-4" weight="bold" />
                </Link>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
              Privacy by Design
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              See exactly what gets proven on-chain versus what stays completely private
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="bg-green-50 rounded-2xl p-8 border border-green-100"
            >
              <h3 className="text-lg font-semibold text-green-800 mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" weight="fill" />
                Proven On-Chain
              </h3>
              <motion.ul
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {[
                  "Income meets $200K threshold",
                  "Verification timestamp",
                  "Attestor signature",
                ].map((item, idx) => (
                  <motion.li
                    key={item}
                    variants={fadeInUp}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="flex items-center gap-3 text-green-700"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" weight="fill" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-gray-900 rounded-2xl p-8"
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <LockKey className="w-5 h-5" weight="fill" />
                Stays Private
              </h3>
              <motion.ul
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {[
                  "Actual income amount",
                  "Bank account details",
                  "Transaction history",
                  "Personal documents",
                ].map((item, idx) => (
                  <motion.li
                    key={item}
                    variants={fadeInUp}
                    transition={{ delay: 0.35 + idx * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <LockKey className="w-4 h-4 flex-shrink-0 text-gray-500" weight="fill" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-12"
          >
            {["Mantle", "Reclaim", "Plaid"].map((company, idx) => (
              <motion.button
                key={company}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-lg font-semibold transition-colors ${idx === 0 ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
              >
                {company}
              </motion.button>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Quote */}
            <AnimatedSection>
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                whileHover={{ y: -4 }}
              >
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
                  <CaretRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" weight="bold" />
                </Link>
              </motion.div>
            </AnimatedSection>

            {/* Right: Logo/Visual */}
            <AnimatedSection delay={0.2} className="flex items-center justify-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-100 to-purple-100 flex items-center justify-center">
                  <MantleLogo size={80} className="text-gray-900" />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-purple-400"
                  animate={{ scale: [1.2, 1, 1.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Ready to Get Verified?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join the future of compliant DeFi. Verify once, access everywhere.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/verify"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl"
                >
                  Start Verification
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="https://github.com/Miny-Labs/Nullifier"
                  target="_blank"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white text-sm font-medium rounded-full border border-gray-700 hover:border-gray-500 transition-all duration-300"
                >
                  View on GitHub
                </a>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-6 h-6 rounded bg-black flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" weight="fill" />
              </div>
              <span className="font-semibold">Nullifier</span>
            </motion.div>
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
