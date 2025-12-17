"use client";
import { useEffect, useState } from "react";
import { useWeb3 } from "../providers/Web3Provider";
import { Address } from "viem";
import SearchButton from "./SearchButton";
import SearchResult from "./SearchResult";

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
    setInputValue(e.target.value.trim());
  };

  const find = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConnected || !aliasStorageService) {
      return;
    }

    setIsSearching(true);

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
    <div className="w-full max-w-2xl mx-auto">
      <form className="relative" onSubmit={find}>
        <input
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Search by address or alias..."
          className="w-full px-5 py-4 pr-36 text-lg rounded-2xl border-2 border-gray-200 bg-slate-800/50 backdrop-blur-sm focus:outline-none transition-all placeholder:text-gray-400"
        />
        <SearchButton 
          isSearching={isSearching} 
          disabled={!isConnected || isSearching || !inputValue || inputValue.trim() === "" || inputValue.trim().length < 3} 
        />
      </form>

      {isConnected && searchResult && (
        <SearchResult query={searchResult.query} result={searchResult.result} />
      )}
    </div>
  );
}
