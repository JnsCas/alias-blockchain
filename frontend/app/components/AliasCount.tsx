"use client";
import { useState, useEffect } from "react";
import { useWeb3 } from "../providers/Web3Provider";

export default function AliasCount() {
  const { aliasStorageService } = useWeb3();
  const [loading, setLoading] = useState(false);
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

  if (loading) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-xl font-medium text-gray-600">total aliases registered</span>
      <span className="text-xl font-medium font-bold">{aliasCount?.toString() || "..."}</span>
    </div>
  );
}
