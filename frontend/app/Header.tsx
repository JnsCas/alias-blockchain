"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 relative z-20">
      <nav className="flex gap-4 underline">
        <a
          href="https://github.com/JnsCas/alias-blockchain"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-blue-700 transition-colors"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M12 1.75C5.98 1.75 1 6.74 1 12.84c0 4.89 3.13 9.01 7.48 10.47.55.1.75-.24.75-.53v-1.88c-3.04.66-3.68-1.46-3.68-1.46-.5-1.29-1.21-1.64-1.21-1.64-.99-.67.07-.66.07-.66 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.92.1-.7.38-1.2.69-1.48-2.43-.28-4.98-1.21-4.98-5.38 0-1.19.42-2.16 1.11-2.92-.11-.28-.48-1.42.1-2.96 0 0 .91-.29 2.99 1.11a10.35 10.35 0 0 1 2.73-.37c.92.004 1.85.13 2.73.37 2.08-1.4 2.99-1.11 2.99-1.11.58 1.54.21 2.68.11 2.96.69.76 1.11 1.73 1.11 2.92 0 4.19-2.55 5.1-4.98 5.38.4.34.74 1.01.74 2.04v3.03c0 .29.2.63.76.53A11.86 11.86 0 0 0 23 12.84C23 6.74 18.02 1.75 12 1.75z"
            />
          </svg>
        </a>
      </nav>
    </header>
  );
}