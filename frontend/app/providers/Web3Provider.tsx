"use client";
import { createContext, ReactNode, useContext, useState } from 'react';
import { type Address, createWalletClient, createPublicClient, custom, type WalletClient, type PublicClient } from 'viem';
import { AliasStorageService } from '../services/aliasStorageService';
import { hardhat, mainnet } from 'viem/chains';

interface Web3ContextType {
  address: Address | null;
  formatedAddress: string | null;
  connectWallet: () => Promise<void>;
  isConnected: boolean;
  disconnect: () => Promise<void>;
  aliasStorageService: AliasStorageService | null;
  currentAlias: string | null;
  setCurrentAlias: (alias: string) => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [formatedAddress, setFormatedAddress] = useState<string | null>(null);
  const [aliasStorageService, setAliasStorageService] = useState<AliasStorageService | null>(null);
  const [currentAlias, setCurrentAlias] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("No wallet found");
      return;
    }
    const ethereum = (window as any).ethereum;
    const chain = process.env.NODE_ENV === "development" ? hardhat : mainnet;
    
    const walletClient = createWalletClient({
        chain: chain,
        transport: custom(ethereum)
    });
    
    const pubClient = createPublicClient({
        chain: chain,
        transport: custom(ethereum)
    });
    
    const aliasStorageService = new AliasStorageService(pubClient, walletClient);
    setAliasStorageService(aliasStorageService);
    
    const [address] = await walletClient.requestAddresses();
    if (address) {
      const alias = await aliasStorageService.getAliasByAddress(address);
      setCurrentAlias(alias);
    }

    setWalletClient(walletClient);
    setPublicClient(pubClient);
    setAddress(address);
    setFormatedAddress(address!.slice(0, 6) + "..." + address!.slice(-4));
  };

  const disconnect = async () => {
    console.log("Disconnecting wallet...");
    setWalletClient(null);
    setPublicClient(null);
    setAddress(null);
    setFormatedAddress(null);
    setAliasStorageService(null);
    setCurrentAlias(null);
    console.log("Wallet disconnected");
  };

  return (
    <Web3Context.Provider
      value={{
        address,
        formatedAddress,
        connectWallet,
        isConnected: !!address,
        disconnect,
        aliasStorageService,
        currentAlias,
        setCurrentAlias,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

