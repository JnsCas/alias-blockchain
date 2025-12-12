"use client";
import Link from "next/link";
import { useWeb3 } from "./providers/Web3Provider";

export default function Header() {
  const { connectWallet, isConnected } = useWeb3();
  
  return (
    <header className="flex justify-between items-center p-4 relative z-20">
      <nav className="flex gap-4 underline">
        <Link href="/">home</Link>
        <Link href="/about">about</Link>
        <Link href="/contact">contact</Link> 
      </nav>
      <div className="flex gap-4">
        {!isConnected && (
          <button onClick={connectWallet} className="underline cursor-pointer">connect</button>
        )}
      </div>
    </header>
  );
}