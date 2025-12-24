# Alias Blockchain - Smart Contracts

Solidity smart contracts for the decentralized alias registry.

## Tech Stack

- **Solidity** - Smart contract language
- **Hardhat 3** - Development environment
- **Hardhat Ignition** - Deployment management
- **Viem** - TypeScript Ethereum library for tests

## Getting Started

### Prerequisites

- Node.js 20+

### Installation

```bash
npm install
```

### Compile Contracts

```bash
npm run compile
```

This compiles the contracts and automatically updates the ABI in the frontend.

### Run Tests

```bash
# Run all tests
npx hardhat test

# Run only Solidity tests
npx hardhat test solidity

# Run only Node.js tests
npx hardhat test nodejs
```

## Deployment

### Local Network

```bash
npx hardhat ignition deploy ignition/modules/AliasStorage.ts
```

### Sepolia Testnet

First, set your private key:

```bash
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

Then deploy:

```bash
npx hardhat ignition deploy --network sepolia ignition/modules/AliasStorage.ts
```

## Contract API

The `AliasStorage` contract provides:

```solidity
// Register or update your alias
function setAlias(string memory _alias) public

// Look up an alias by address
function getAliasByAddress(address addr) public view returns (string memory)

// Look up an address by alias
function getAddressByAlias(string memory _alias) public view returns (address)

// Delete your alias
function deleteMyAlias() public

// Total number of registered aliases
uint256 public aliasCount
```

## Project Structure

```
web3/
├── contracts/          # Solidity source files
│   ├── AliasStorage.sol
│   └── AliasStorage.t.sol
├── ignition/
│   ├── modules/        # Deployment modules
│   └── deployments/    # Deployment artifacts
├── test/               # TypeScript tests
└── scripts/            # Utility scripts
```

## Deployed Addresses

- **Sepolia:** Check `ignition/deployments/chain-11155111/deployed_addresses.json`
- **Local:** Check `ignition/deployments/chain-31337/deployed_addresses.json`
