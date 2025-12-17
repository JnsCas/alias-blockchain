"use client";
import { useState } from "react";

type CopyToClipboardProps = {
  text: string;
  variant?: "light" | "dark" | "accent";
};

export default function CopyToClipboard({ text, variant = "light" }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const copyIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );

  const checkIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
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

  const styles = {
    light: {
      container: "bg-white/90 border border-gray-200",
      code: "text-emerald-800",
      button: "text-emerald-600 hover:bg-emerald-100",
    },
    dark: {
      container: "bg-slate-800/50 border border-slate-700",
      code: "text-slate-300",
      button: "text-slate-500 hover:text-blue-400 hover:bg-slate-700",
    },
    accent: {
      container: "bg-emerald-500/10 border border-emerald-500/30",
      code: "text-emerald-400 font-semibold",
      button: "text-emerald-500 hover:text-emerald-300 hover:bg-emerald-500/20",
    },
  };

  const style = styles[variant];

  return (
    <div className={`flex items-center justify-between gap-4 p-3 rounded-xl ${style.container}`}>
      <code className={`font-mono text-sm break-all ${style.code}`}>
        {text}
      </code>
      <button
        onClick={handleCopy}
        className={`shrink-0 p-2 rounded-lg transition-colors ${style.button}`}
        title={copied ? "Copied!" : "Copy to clipboard"}
      >
        {copied ? checkIcon : copyIcon}
      </button>
    </div>
  );
}
