"use client";
import CopyToClipboard from "./CopyToClipboard";
import { useWeb3 } from "../providers/Web3Provider";

export default function ProfileInfo() {
  const { address, currentAlias, aliasStorageService, setCurrentAlias } = useWeb3();

  const handleDeleteAlias = async () => {
    if (!aliasStorageService) {
      return;
    }
    await aliasStorageService.deleteAlias();
    setCurrentAlias("");
    alert("Alias deleted successfully!");
  };

  return (
    <div className="pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">your profile</h2>
      </div>
      <div className="space-y-3">
        <div className="text-center">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide">address</span>
          <CopyToClipboard text={address!} />
        </div>
        {currentAlias && (
          <div>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide">alias</span>
            <CopyToClipboard text={currentAlias} />
          </div>
        )}
        {currentAlias && (
          <div className="flex flex-col gap-2">
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            onClick={handleDeleteAlias}
          >
            delete alias
          </button>
          </div>
        )}
      </div>
    </div>
  );
}

