"use client";
import { useWeb3 } from "../providers/Web3Provider";
import CopyToClipboard from "./CopyToClipboard";

export default function UserInfo() {
  const { address, currentAlias } = useWeb3();

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Wallet Address
        </label>
        <div className="mt-2">
          <CopyToClipboard text={address!} variant="dark" />
        </div>
      </div>

      {currentAlias && (
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Your Alias
          </label>
          <div className="mt-2">
            <CopyToClipboard text={currentAlias} variant="accent" />
          </div>
        </div>
      )}
    </div>
  );
}
