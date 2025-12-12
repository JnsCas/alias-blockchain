import { type Address } from 'viem';

export { aliasStorageAbi } from './AliasStorage';
export const ALIAS_STORAGE_ADDRESS: Address = (process.env.NEXT_PUBLIC_ALIAS_STORAGE_ADDRESS as Address) || ("0x0000000000000000000000000000000000000000" as Address);

