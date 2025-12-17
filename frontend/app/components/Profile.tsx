"use client";
import { useWeb3 } from "../providers/Web3Provider";
import UpdateAlias from "./AliasForm";
import UserInfo from "./ProfileInfo";
import DeleteAliasButton from "./DeleteAliasButton";

export default function Profile() {
  const { currentAlias } = useWeb3();

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="font-bold text-white text-lg">Your Profile</h2>
        <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Connected
        </p>
      </div>

      <UserInfo />

      <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
        <UpdateAlias />
        {currentAlias && <DeleteAliasButton />}
      </div>
    </div>
  );
}

