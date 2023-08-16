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