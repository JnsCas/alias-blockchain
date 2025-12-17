"use client";
import { useWeb3 } from "../providers/Web3Provider";

export default function DisconnectButton() {
  const { disconnect } = useWeb3();

  return (
    <button 
      onClick={disconnect} 
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Disconnect
    </button>
  );
}

