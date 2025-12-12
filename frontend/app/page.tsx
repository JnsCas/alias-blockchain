"use client";
import { useState } from "react";
import { useWeb3 } from "./providers/Web3Provider";
import { Address } from "viem";

export default function Home() {
  const { aliasStorageService, isConnected } = useWeb3();
  const [inputValue, setInputValue] = useState<Address | string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const find = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConnected || !aliasStorageService) {
      alert("Please connect your wallet");
      return;
    }


    const address = await aliasStorageService.find(inputValue);
    if (address) {
      alert(`Address: ${address}`);
    } else {
      alert("Address not found");
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-8xl font-bold py-8 text-center">human alias for crypto wallets</h1>
      <p className="text-lg text-gray-500 max-w-2xl text-center">
        Create memorable, human-readable aliases for your crypto wallet addresses using the power of blockchain.
      </p>
      <form className="flex gap-4 w-full max-w-md py-8" onSubmit={find}>
        <input onChange={handleInputChange} type="text" placeholder="Find by address or alias" className="w-full max-w-md p-2 rounded-md border border-gray-300 flex-1" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md bg-transparent hover:bg-white hover:text-black border border-gray-300 font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={!isConnected}>Find</button>
      </form>
    </div>
  );
}
