import { useWeb3 } from "../providers/Web3Provider";

export default function ConnectWalletButton() {
  const { connectWallet } = useWeb3();
  
  return (
    <div className="text-center">
      <button
        onClick={connectWallet}
        className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg hover:shadow-blue-200 transition-all"
      >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
        Connect Wallet
      </button>
    </div>
  );
}