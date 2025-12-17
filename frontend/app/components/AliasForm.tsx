"use client";
import { useState } from "react";
import { useWeb3 } from "../providers/Web3Provider";

export default function UpdateAlias() {
  const [aliasInput, setAliasInput] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { aliasStorageService, currentAlias, setCurrentAlias } = useWeb3();
  
  const handleCreateAlias = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!aliasStorageService || !aliasInput) {
      return;
    }

    setIsCreating(true);
    try {
      await aliasStorageService.setAlias(aliasInput);
      setCurrentAlias(aliasInput);
      setAliasInput("");
    } catch (error: any) {
      console.error("Error creating alias:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={handleCreateAlias} className="flex flex-col gap-3">
      <input
        type="text"
        value={aliasInput}
        onChange={(e) => setAliasInput(e.target.value.trim())}
        placeholder="Enter your new alias..."
        className="w-full p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        disabled={isCreating}
      />
      <button
        type="submit"
        disabled={isCreating || !aliasInput || aliasInput.length < 3}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-2.5 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {isCreating ? "Creating..." : currentAlias ? "Update Alias" : "Create Alias"}
      </button>
    </form>
  );
}
