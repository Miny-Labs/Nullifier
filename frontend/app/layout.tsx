import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Web3Provider } from "@/providers/Web3Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Nullifier - Privacy-Preserving Accredited Investor Verification",
  description:
    "Prove your accreditation status without revealing your income using ZK proofs on Mantle.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
