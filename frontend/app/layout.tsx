import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import { Web3Provider } from "./providers/Web3Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Human Alias for Crypto Wallets",
  description: "Human Alias for Crypto Wallets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Human Alias for Crypto Wallets</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Web3Provider>
          <Header />
          <div className="flex-1">
            {children}
          </div>
          <footer className="text-center text-sm text-gray-500 p-4">
            <p>Copyright 2025 human alias for crypto wallets</p>
          </footer>
        </Web3Provider>
      </body>
    </html>
  );
}
