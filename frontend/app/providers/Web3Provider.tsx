"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { type Address, createPublicClient, createWalletClient, custom } from 'viem';
import { hardhat, sepolia } from 'viem/chains';
import { AliasStorageService } from '../services/aliasStorageService';
import { formatAddress } from '../util';

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

const initClients = () => {
  const ethereum = (window as any).ethereum;
  if (!ethereum) {
    alert("No wallet found. Please install MetaMask.");
    throw new Error("No wallet found. Please install MetaMask.");
  }
  const chain = process.env.NODE_ENV === "development" ? hardhat : sepolia;
  const walletClient = createWalletClient({
    chain: chain,
    transport: custom(ethereum)
  });
  const pubClient = createPublicClient({
    chain: chain,
    transport: custom(ethereum)
  });
  return { walletClient, pubClient };
}

export function Web3Provider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<Address | null>(null);
  const [formatedAddress, setFormatedAddress] = useState<string | null>(null);
  const [aliasStorageService, setAliasStorageService] = useState<AliasStorageService | null>(null);
  const [currentAlias, setCurrentAlias] = useState<string | null>(null);

  useEffect(() => {
    const reconnect = async () => {
      const ethereum = (window as any).ethereum;
      // eth_accounts doesn't prompt the user - it just checks if already connected
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts && accounts.length > 0) {
        connectWallet();       
      }
    };
    
    reconnect();
  }, []);

  const connectWallet = async () => {
    const { walletClient, pubClient } = initClients();
    const aliasStorageService = new AliasStorageService(pubClient, walletClient);
    setAliasStorageService(aliasStorageService);
    
    const [address] = await walletClient.requestAddresses();
    if (address) {
      const alias = await aliasStorageService.getAliasByAddress(address);
      setCurrentAlias(alias);
    }

    setAddress(address);
    setFormatedAddress(formatAddress(address!));
  };

  const disconnect = async () => {
    console.log("Disconnecting wallet...");
    
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      await ethereum.request({
        method: 'wallet_revokePermissions',
        params: [{ eth_accounts: {} }]
      });
      setAddress(null);
      setFormatedAddress(null);
      setAliasStorageService(null);
      setCurrentAlias(null);
      console.log("Wallet disconnected");
    } else {
      console.log("No wallet found");
    }
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

