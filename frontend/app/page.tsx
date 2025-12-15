"use client";
import { useWeb3 } from "./providers/Web3Provider";
import UserProfile from "./components/UserProfile";
import Search from "./components/Search";
import AliasCount from "./components/AliasCount";

export default function Home() {
  const { isConnected } = useWeb3();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {isConnected && <UserProfile />}
      <div className="flex flex-col items-center justify-center max-w-4xl space-y-12">
        <div className="text-center">
          <h1 className="text-8xl font-bold py-6 text-center">human alias for crypto wallet addresses</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto text-center">
            using blockchain to create human-readable aliases for your crypto wallet addresses.
          </p>
        </div>

        <Search />

        {isConnected && <AliasCount />}
      </div>
    </main>
  );
}
