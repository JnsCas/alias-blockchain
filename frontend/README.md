# Alias Blockchain - Frontend

Next.js application for interacting with the AliasStorage smart contract.

## Tech Stack

- **Next.js** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Viem** - TypeScript Ethereum library for wallet interactions

## Getting Started

### Prerequisites

- Node.js 20+
- MetaMask browser extension
- Sepolia testnet ETH ([faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia))

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_ALIAS_STORAGE_ADDRESS` | Deployed contract address |

**Contract addresses by network:**
- **Sepolia:** `0xC391FB6992BF56b1De0DcD7d93a00364289F1BF8`

## Project Structure

```
frontend/
├── app/
│   ├── components/     # React components
│   │   ├── AliasForm.tsx
│   │   ├── ConnectWalletButton.tsx
│   │   ├── Search.tsx
│   │   └── ...
│   ├── providers/      # Web3 context provider
│   ├── services/       # Blockchain service layer
│   └── page.tsx        # Main page
└── contracts/          # ABI and contract address
```

## Docker

Build and run with Docker:

```bash
docker build \
  --build-arg NEXT_PUBLIC_ALIAS_STORAGE_ADDRESS=0xC391FB6992BF56b1De0DcD7d93a00364289F1BF8 \
  -t alias-blockchain-frontend .
```
```bash
docker run -p 3000:3000 alias-blockchain-frontend
```