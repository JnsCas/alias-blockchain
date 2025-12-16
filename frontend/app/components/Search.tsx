"use client";
import { useEffect, useState } from "react";
import { useWeb3 } from "../providers/Web3Provider";
import { Address } from "viem";
import CopyToClipboard from "./CopyToClipboard";

export default function Search() {
  const { aliasStorageService, isConnected } = useWeb3();
  const [inputValue, setInputValue] = useState<Address | string>("");
  const [searchResult, setSearchResult] = useState<{ query: string; result: string | null } | null>(null);
  const [isSearching, setIsSearching] = useState(false);


  useEffect(() => {
    if (!isConnected) {
      setInputValue("");
      setSearchResult(null);
    }
  }, [isConnected]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const find = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConnected || !aliasStorageService) {
      return;
    }

    setIsSearching(true);

    const trimmedInputValue = inputValue.trim();
    try {
      
      const result = await aliasStorageService.find(trimmedInputValue);
      setSearchResult({ query: trimmedInputValue, result: result as string | null });
    } catch (error) {
      console.error("Search error:", error);
      setSearchResult({ query: trimmedInputValue, result: null });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form className="relative" onSubmit={find}>
        <input
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Search by address or alias..."
          className="w-full px-5 py-4 pr-36 text-lg rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={!isConnected || isSearching || !inputValue || inputValue.trim() === ""}
          className={`absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-xl font-semibold transition-all
            ${isSearching 
              ? "bg-gray-100 text-gray-400" 
              : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg hover:shadow-blue-200"
            }
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none`}
        >
          {isSearching ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Searching
            </span>
          ) : "Search"}
        </button>
      </form>

      {isConnected && searchResult && (
        <div className={`w-full mt-6 p-5 h-32 rounded-2xl flex flex-col justify-center ${
          searchResult.result 
            ? "bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200" 
            : "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200"
        }`}>
          {searchResult.result ? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-emerald-600">
                Result for <span className="font-semibold">"{searchResult.query}"</span>
              </p>
              <CopyToClipboard text={searchResult.result} />
            </div>
          ) : (
            <div className="text-center">
              <p className="font-semibold text-gray-700">No result found</p>
              <p className="text-sm text-gray-500 mt-1">
                No match for "<span className="font-medium">{searchResult.query}</span>"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
