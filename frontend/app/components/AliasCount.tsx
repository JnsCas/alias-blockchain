"use client";
import { useState, useEffect } from "react";
import { useWeb3 } from "../providers/Web3Provider";

export default function AliasCount() {
  const { aliasStorageService } = useWeb3();
  const [loading, setLoading] = useState(true);
  const [aliasCount, setAliasCount] = useState<bigint | null>(null);

  useEffect(() => {
    const fetchAliasCount = async () => {
      if (!aliasStorageService) return;

      setLoading(true);
      try {
        const count = await aliasStorageService.getAliasCount();
        setAliasCount(count);
      } catch (error) {
        console.error("Failed to fetch alias count:", error);
      } finally {
        setLoading(false);
      }
    };

    if (aliasStorageService) {
      fetchAliasCount();
    }
  }, [aliasStorageService]);

  if (aliasCount === BigInt(0)) return null;
  
  return (
    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-blue-50 border border-blue-200">
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      <span className="text-sm text-blue-700">
        <span className="font-bold text-blue-600">
          {loading || aliasCount === null ? "—" : `${aliasCount.toString()} aliases registered`}
        </span>
      </span>
    </div>
  );
}
