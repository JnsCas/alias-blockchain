import { type Address, zeroAddress } from 'viem';

export { aliasStorageAbi } from './AliasStorage';
export const ALIAS_STORAGE_ADDRESS: Address = (process.env.NEXT_PUBLIC_ALIAS_STORAGE_ADDRESS as Address) || zeroAddress;

