"use client";
import { useState } from "react";
import { useWeb3 } from "../providers/Web3Provider";
import { Address } from "viem";

export default function Search() {
  const { aliasStorageService, isConnected } = useWeb3();
  const [inputValue, setInputValue] = useState<Address | string>("");
  const [searchResult, setSearchResult] = useState<{ query: string; result: string | null } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const find = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConnected || !aliasStorageService) {
      return;
    }

    setIsSearching(true);
    setSearchResult(null);

    try {
      const result = await aliasStorageService.find(inputValue);
      setSearchResult({ query: inputValue, result: result as string | null });
    } catch (error) {
      console.error("Search error:", error);
      setSearchResult({ query: inputValue, result: null });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <form className="flex gap-4" onSubmit={find}>
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="Find by address or alias"
          className="w-full p-2 rounded-md border border-gray-300 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md bg-transparent hover:bg-white hover:text-black border border-gray-300 font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isConnected || isSearching}
        >
          {isSearching ? "Searching..." : "Find"}
        </button>
      </form>

      {searchResult && (
        searchResult.result ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600 mb-1">Result for "{searchResult.query}"</p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-green-800 break-all">{searchResult.result}</span>
              <button
                onClick={() => navigator.clipboard.writeText(searchResult.result!)}
                className="ml-2 text-sm text-green-600 hover:text-green-800 transition-colors whitespace-nowrap"
              >
                Copy
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-600 text-center">No result found for "{searchResult.query}"</p>
          </div>
        )
      )}
    </div>
  );
}
