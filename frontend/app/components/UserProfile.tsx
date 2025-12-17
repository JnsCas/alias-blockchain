"use client";
import { useWeb3 } from "../providers/Web3Provider";
import Profile from "./Profile";
import DisconnectButton from "./DisconnectButton";

export default function ProfilePanel() {
  const { isConnected } = useWeb3();

  if (!isConnected) {
    return null;
  }

  return (
    <aside className="fixed top-0 right-0 w-80 bg-gradient-to-b from-slate-900 to-slate-950 border-l border-slate-800 p-6 h-screen overflow-y-auto z-10 flex flex-col">
      <div className="flex-1">
        <Profile />
      </div>

      <div className="pt-4 border-t border-slate-800">
        <DisconnectButton />
      </div>
    </aside>
  );
}
