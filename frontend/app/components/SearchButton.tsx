"use client";

type SearchButtonProps = {
  isSearching: boolean;
  disabled: boolean;
};

export default function SearchButton({ isSearching, disabled }: SearchButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
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
  );
}

