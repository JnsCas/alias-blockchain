"use client";
import CopyToClipboard from "./CopyToClipboard";

type SearchResultProps = {
  query: string;
  result: string | null;
};

export default function SearchResult({ query, result }: SearchResultProps) {
  return (
    <div className={`w-full mt-6 p-5 h-32 rounded-2xl flex flex-col justify-center ${
      result 
        ? "bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200" 
        : "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200"
    }`}>
      {result ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-emerald-600">
            Result for <span className="font-semibold">"{query}"</span>
          </p>
          <CopyToClipboard text={result} />
        </div>
      ) : (
        <div className="text-center">
          <p className="font-semibold text-gray-700">No result found</p>
          <p className="text-sm text-gray-500 mt-1">
            No match for "<span className="font-medium">{query}</span>"
          </p>
        </div>
      )}
    </div>
  );
}

