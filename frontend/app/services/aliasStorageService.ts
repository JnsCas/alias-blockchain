import { isAddress, SimulateContractParameters, WriteContractParameters, type Address, type PublicClient, type WalletClient } from 'viem';
import { readContract, simulateContract, writeContract } from 'viem/actions';
import { ALIAS_STORAGE_ADDRESS, aliasStorageAbi } from '../../contracts';

/**
 * AliasStorage Contract Service
 * 
 * Encapsulates all contract interactions for AliasStorage.
 */
export class AliasStorageService {
  constructor(
    private client: PublicClient,
    private walletClient: WalletClient,
    private contractAddress: Address = ALIAS_STORAGE_ADDRESS
  ) {}

  /**
   * Get address by alias
   * @param alias - The alias to look up
   * @returns The address associated with the alias, or null if not found
   */
  async getAddressByAlias(alias: string): Promise<Address | null> {
    try {
      const result = await readContract(this.client, {
        address: this.contractAddress,
        abi: aliasStorageAbi,
        functionName: "getAddressByAlias",
        args: [alias],
      });

      // If result is zero address, alias doesn't exist
      if (result === "0x0000000000000000000000000000000000000000") {
        return null;
      }
      return result as Address;
    } catch (error) {
      console.error("Error getting address by alias:", error);
      throw error;
    }
  }

  /**
   * Get alias by address
   * @param address - The address to look up
   * @returns The alias associated with the address, or null if not found
   */
  async getAliasByAddress(address: Address): Promise<string | null> {
    try {
      const result = await readContract(this.client, {
        address: this.contractAddress,
        abi: aliasStorageAbi,
        functionName: "getAliasByAddress",
        args: [address],
      });

      // If result is empty string, address doesn't have an alias
      if (result === "") {
        return null;
      }
      return result as string;
    } catch (error) {
      console.error("Error getting alias by address:", error);
      throw error;
    }
  }

  /**
   * Find by alias or address
   * Automatically detects if input is an alias or address
   * @param param - Either an alias (string) or address
   * @returns The corresponding address or alias, or null if not found
   */
  async find(param: Address | string): Promise<Address | string | null> {
    if (isAddress(param)) {
        console.log("Looking up alias by address");
        return this.getAliasByAddress(param as Address);
    } else {
        console.log("Looking up address by alias");
        return this.getAddressByAlias(param as string);
    }
  }

  /**
   * Set an alias for the connected wallet
   * @param alias - The alias to set
   */
  async setAlias(alias: string): Promise<Address> {
    try {
      const [account] = await this.walletClient.getAddresses();
      const hash = await this.sendWalletWriteTransaction({
        account,
        chain: this.walletClient.chain,
        address: this.contractAddress,
        abi: aliasStorageAbi,
        functionName: "setAlias",
        args: [alias],
      });
      return hash as Address;
    } catch (error) {
      console.error("Error setting alias:", error);
      throw error;
    }
  }

  /**
   * Delete the alias for the connected wallet
   */
  async deleteAlias(): Promise<Address> {
    try {
      const [account] = await this.walletClient.getAddresses();
      const hash = await writeContract(this.walletClient, {
        account,
        chain: this.walletClient.chain,
        address: this.contractAddress,
        abi: aliasStorageAbi,
        functionName: "deleteMyAlias",
        args: [],
      });
      return hash as Address;
    } catch (error) {
      console.error("Error deleting alias:", error);
      throw error;
    }
  }

  private async sendWalletWriteTransaction(transactionRequest: WriteContractParameters) {
    console.log("Sending simulated transaction...");
    const { request } = await simulateContract(this.walletClient, transactionRequest as SimulateContractParameters);
    console.log("Simulated transaction sent successfully");
    console.log("Writing transaction...");
    const hash = await writeContract(this.walletClient, request as WriteContractParameters);
    console.log("Transaction written successfully");
    console.log("Hash:", hash);
    return hash;
  }
}

