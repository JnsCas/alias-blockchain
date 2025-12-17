"use client";
import { useWeb3 } from "../providers/Web3Provider";

export default function DeleteAliasButton() {
  const { aliasStorageService, setCurrentAlias } = useWeb3();

  const handleDeleteAlias = async () => {
    if (!aliasStorageService) {
      return;
    }
    await aliasStorageService.deleteAlias();
    setCurrentAlias("");
  };

  return (
    <button
      className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-500/20 text-white px-4 py-2.5 rounded-xl font-medium transition-colors text-sm border border-red-500/20"
      onClick={handleDeleteAlias}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      Delete Alias
    </button>
  );
}

