cd to created template game dir and
```
npm run initialize
```

```
npm run database:up
```

Contract deploy

```
./paima-engine contracts
cd contracts/ paima-l2-contract
nvm use 16.20.0
export PRIVATE_KEY=dc18907660410084b16f4a960f283491859bf48995f5c1bd7201383bb723ee56
npx truffle migrate --network ganache
```

```
npm run compile:db
```

```
npm run compile:api
```

## Adding new stuff
`query in db dir -> controller in api dir -> endpoint in middleware`

then

```
cd db && npm run build && cd .. && npm run compile:api && npm run compile:db
```

```
npm run pack && npm run pack:middleware
```

## NFT install

```
nvm use 16.20.0
npm i
./deploy.sh
```

### RPS one

```
Deployed contract addresses:
   Nft: 0x95Da09050FdB318C2C9D0B142F07877cB5bf5E22

To automatically add this contract's Data to your game node database, you can copy and paste the following to your CDE config file:
  - name: "Test NFT contract"
    type: erc721
    contractAddress: "0x95Da09050FdB318C2C9D0B142F07877cB5bf5E22"
    startBlockHeight: 51
    initializationPrefix: "nftmint"
```

```
Deployed contract addresses:
   NativeNftSale: 0x3c463c0EBDaEbe2B85E505d6df9E985292361898
   NativeProxy:   0x9ac22615B3A888f9EB5D2B26746AccF1E3dd28B2
```

## PKEY
```
dc18907660410084b16f4a960f283491859bf48995f5c1bd7201383bb723ee56
```