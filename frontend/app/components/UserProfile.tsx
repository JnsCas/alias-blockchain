"use client";
import { useWeb3 } from "../providers/Web3Provider";
import AliasForm from "./AliasForm";
import ProfileInfo from "./ProfileInfo";

export default function UserProfile() {
  const { address, isConnected, disconnect, currentAlias } = useWeb3();

  if (!isConnected) {
    return null;
  }

  return (
    <aside className="fixed top-0 right-0 w-80 bg-white dark:bg-gray-800 border-l border-gray-300 dark:border-gray-700 p-6 h-screen overflow-y-auto z-10 flex flex-col text-center">
      <div className="gap-6 flex-1">
        <ProfileInfo />
        <AliasForm />
      </div>

      <div className="flex justify-center pt-6 border-t border-gray-300 dark:border-gray-700">
        <button 
          onClick={disconnect} 
          className="text-sm underline cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          disconnect
        </button>
      </div>
    </aside>
  );
}

