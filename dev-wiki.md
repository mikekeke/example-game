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
- `npx truffle migrate --network ganache`
- get contract address and put in `.env.development.CONTRACT_ADDRESS`

### NFT

TODO: make a note: Maybe this is some common knowledge, but despite of using address of  `NativeProxy` contract to mint NFT from TypeScript code in the `middleware`, existing example and I am as well use abi of `NativeNftSale` in TypeScript code to call buy endpoint, coz after generating modules with `typechain`, there is no endpoints like `nftAddress` or `nftPrice` or `buyNft` in factory, that was generated from `NativeProxy` abi.

- `cd contracts/nft`
- nvm use 16.20.0
- npm i
- *if required*, edit `enum NftType` in `contracts/nft/src/NftType.sol`
- *if required*, edit mapper in `contracts/nft/src/NftTypeMapper.sol`
- set owner in `contracts/nft/deploy-config.json` (pub key hash w/o `0x`)
- add Ganache settings to `contracts/nft/deploy.sh` and `contracts/nft/truffle-config.js`
- `export PRIVATE_KEY=...`
- exec `contracts/nft/deploy.sh` to deploy `Paima ERC721`
  - put output as CDE to `extensions.yml`
- exec `contracts/nft/deploy.sh` to deploy `NativeNftSale`
  - `NativeProxy` can be used now to call NFT sale endpoints to buy NFTs
  - make a note with terminal output, should be something like
    ```
    Deployed contract addresses:
      NativeNftSale: 0x62369d389dD061b54D5D875FE92e431dFfA3ECa2
      NativeProxy:   0x4CE0d6e6a7DC1a975b84DB104931Fe58D51A3eD3
      ```
- (just it case) in `contracts/nft` run `npm run compile`
- grab required `abis` from `contracts/nft/build` and put them in `example-game/middleware/abis`
  - in the current case for the `middleware` endpoint `NativeNftSale.json` is required to mint achievement NFT - put it in `example-game/middleware/abis`
- `cd` to `example-game/middleware` and `npm run gen-abi-types`
- TODO: put address of `NativeProxy` to contract call settings (now hardcoded)

TODO: make a note, that it is probably possible to call mint directly, w/o using NFT sale contract, but I decided to go this way for extra safety, as official docs suggest to deploy and use it, and code examples use it as well. 


## Current deployed stuff

```
Deployed contract addresses:
   NativeNftSale: 0x62369d389dD061b54D5D875FE92e431dFfA3ECa2
   NativeProxy:   0x4CE0d6e6a7DC1a975b84DB104931Fe58D51A3eD3
```

## Achievements
All achievement currently stored under single stateful NFT.

There is no way to forbid suer to mint achievement NFT, e.g. by calling contract directly. But the DB layer:
- will not create state for NFT if another achievement NFT already exist for the user
- even if state will be somehow created, SQL query always returns NFT single state for the NFT with lowest ID

Mint inputs, though, will stay in L2 contract.


```
link art cousin prosper kiss blast glimpse cricket guide arrive dune cinnamon
```