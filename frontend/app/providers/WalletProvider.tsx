"use client";
import { createContext, useContext, useState, ReactNode } from 'react';
import { createWalletClient, createTestClient, custom, type WalletClient, type Address, TestClient } from 'viem';
import { foundry, mainnet, sepolia } from 'viem/chains';

interface WalletContextType {
  address: Address | null;
  formatedAddress: string | null;
  connectWallet: () => Promise<void>;
  isConnected: boolean;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const createClient = async () => {
    if (process.env.NODE_ENV === "development") {
        const client: TestClient = createTestClient({
          chain: sepolia,
          transport: custom((window as any).ethereum!),
          mode: "anvil"
        });
        console.log("client", client);
        const address = client.account!.address;
        return { client, address };
    }

    const client = createWalletClient({
        chain: mainnet,
        transport: custom((window as any).ethereum!)
    });
    const [address] = await client.requestAddresses();
    return { client, address };
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<WalletClient | TestClient | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [formatedAddress, setFormatedAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("No wallet found");
      return;
    }
    const { client, address } = await createClient();
    setClient(client);
    setAddress(address);
    setFormatedAddress(address!.slice(0, 6) + "..." + address!.slice(-4));
  };

  const disconnect = async () => {
    setClient(null);
    setAddress(null);
    setFormatedAddress(null);
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        formatedAddress,
        connectWallet,
        isConnected: !!address,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

