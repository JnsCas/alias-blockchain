import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const artifactPath = join(__dirname, '../artifacts/contracts/AliasStorage.sol/AliasStorage.json');
const frontendAbiPath = join(__dirname, '../../frontend/contracts/AliasStorage.ts');

try {
  const artifact = JSON.parse(readFileSync(artifactPath, 'utf-8'));
  const abi = artifact.abi;

  const tsContent = `import type { Abi } from 'viem';

/**
 * AliasStorage Contract ABI
 * 
 * This file is auto-generated from the compiled contract artifact in web3 project.
 * To regenerate: Run 'npm run compile' in web3 project root directory.
 */
export const aliasStorageAbi = ${JSON.stringify(abi, null, 2)} as const satisfies Abi;
`;

  writeFileSync(frontendAbiPath, tsContent, 'utf-8');
  
  console.log('✅ ABI extracted and updated in frontend/contracts/AliasStorage.ts');
} catch (error) {
  console.error('❌ Error extracting ABI:', error);
  process.exit(1);
}

