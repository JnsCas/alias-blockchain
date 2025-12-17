"use client";
import { useWeb3 } from "./providers/Web3Provider";
import ProfilePanel from "./components/UserProfile";
import Search from "./components/Search";
import AliasCount from "./components/AliasCount";
import ConnectWalletButton from "./components/ConnectWalletButton";

export default function Home() {
  const { isConnected } = useWeb3();

  return (
    <main className="flex flex-col items-center px-4 pt-24 md:pt-32">
      {isConnected && <ProfilePanel />}

      <div className="flex flex-col items-center w-full max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold py-4 bg-gradient-to-r from-violet-600 via-blue-500 to-teal-400 bg-clip-text text-transparent">
            human alias for crypto wallet addresses
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mt-4">
            Create human-readable aliases for your crypto wallet addresses, stored on the blockchain.
          </p>
        </div>

        <Search />

        <div className="mt-10">
          {isConnected ? <AliasCount /> : <ConnectWalletButton />}
        </div>
      </div>
    </main>
  );
}
