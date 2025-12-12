"use client";
import { useState } from "react";
import { useWeb3 } from "../providers/Web3Provider";

export default function AliasForm() {
  const [aliasInput, setAliasInput] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { aliasStorageService, currentAlias, setCurrentAlias } = useWeb3();
  
  const handleCreateAlias = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const alias = aliasInput.trim();
    if (!aliasStorageService || !alias) {
      return;
    }

    setIsCreating(true);
    try {
      await aliasStorageService.setAlias(alias);
      setCurrentAlias(alias);
      setAliasInput("");
      alert("Alias created successfully!");
    } catch (error: any) {
      console.error("Error creating alias:", error);
      alert(`Failed to create alias: ${error?.message || "Unknown error"}`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
      <form onSubmit={handleCreateAlias} className="flex flex-col gap-3">
        <div>
          <label htmlFor="alias-input" className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
            {currentAlias ? "update your alias" : "create a new alias"}
          </label>
          <input
            id="alias-input"
            type="text"
            value={aliasInput}
            onChange={(e) => setAliasInput(e.target.value)}
            placeholder="enter your alias..."
            className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
            disabled={isCreating}
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={isCreating || !aliasInput.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isCreating ? "creating..." : currentAlias ? "update" : "create"}
          </button>
        </div>
      </form>
    </div>
  );
}

