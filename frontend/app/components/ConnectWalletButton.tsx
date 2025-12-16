import { useWeb3 } from "../providers/Web3Provider";

export default function ConnectWalletButton() {
  const { connectWallet } = useWeb3();
  
  return (
    <div className="text-center">
      <button
        onClick={connectWallet}
        className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-300 transition-all"
      >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
        Connect Wallet
      </button>
    </div>
  );
}