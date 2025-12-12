"use client";
import Link from "next/link";
import { useWeb3 } from "./providers/Web3Provider";

export default function Header() {
  const { connectWallet, formatedAddress, isConnected, disconnect } = useWeb3();
  
  return (
    <header className="flex justify-between items-center p-4">
      <nav className="flex gap-4 underline">
        <Link href="/">home</Link>
        <Link href="/about">about</Link>
        <Link href="/contact">contact</Link> 
      </nav>
      <div className="flex gap-4">
        <label>{formatedAddress}</label>
        <button onClick={isConnected ? disconnect : connectWallet} className="underline cursor-pointer">{isConnected ? "disconnect" : "connect"}</button>
      </div>
    </header>
  );
}