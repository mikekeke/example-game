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

```
docker rm generic-postgres && docker volume rm docker_example-game-00-db
```

## Fresh deploy to Ganache

### L2 contract

- `cd contracts/paima-l2-contract`
- nvm use 16.20.0
- npm i
- add Ganache settings to `contracts/nft/truffle-config.js`
- set owner in `contracts/paima-l2-contract/truffle-config.js` (pub key hash w/o `0x`)
- `export PRIVATE_KEY=...`
- `npx truffle migrate --network ganache``
- get contract address and put in `.env.development

### NFT

- `cd contracts/nft`
- nvm use 16.20.0
- npm i
- edit `enum NftType` in `contracts/nft/src/NftType.sol`
- edit mapper in `contracts/nft/src/NftTypeMapper.sol`
- set owner in `contracts/nft/deploy-config.json` (pub key hash w/o `0x`)
- add Ganache settings to `contracts/nft/deploy.sh` and `contracts/nft/truffle-config.js`
- `export PRIVATE_KEY=...`
- exec `contracts/nft/deploy.sh` to deploy `Paima ERC721`
  - put output as CDE to `extensions.yml`
- exec `contracts/nft/deploy.sh` to deploy `NativeNftSale`
  - `NativeProxy` can be used now to call NFT sale endpoints to buy NFTs
- TODO: copy abi ang generate TS modules


## Current deployed stuff

```
Deployed contract addresses:
   NativeNftSale: 0xB7093F0d2b39821aFe7D525Eb46CA5cf04d5a1a4
   NativeProxy:   0x4F04B4A9964e45A9226564479448B4e4F0b33398
```

## Achievements
All achievement currently stored under single stateful NFT.

There is no way to forbid suer to mint achievement NFT, e.g. by calling contract directly. But the DB layer:
- will not create state for NFT if another achievement NFT already exist for the user
- even if state will be somehow created, SQL query always returns NFT single state for the NFT with lowest ID

Mint inputs, though, will stay in L2 contract.