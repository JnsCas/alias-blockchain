"use client";
import { useState } from "react";

export default function CopyToClipboard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const readyToCopyIcon = (
    <svg
      className="w-4 h-4 text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );

  const copiedIcon = (
    <svg
      className="w-4 h-4 text-gray-500 dark:text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );

  const handleCopy = async () => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="relative mt-1">
      <p className="text-sm break-all text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 p-2 rounded-md px-10">
        {text}
      </p>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
        title={copied ? "Copied!" : "Copy to clipboard"}
      >
        {copied ? readyToCopyIcon : copiedIcon}
      </button>
    </div>
  );
}

