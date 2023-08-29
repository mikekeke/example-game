const privateKey = process.env.PRIVATE_KEY;
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  contracts_directory: "./src/contract",
  contracts_build_directory: "./build",
  migrations_directory: "./src/migrations",
  compilers: {
    solc: {
      version: "0.8.13",
      evmVersion: "berlin",
    },
  },
  contract_config: {
    owner: "49480F40Aee6795CA5B10c9Df93AdC238dFB97df",
    fee: 10n ** 14n
  },
  networks: {
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "5777",
    },
    testnet: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [privateKey],
          providerOrUrl: "https://rpc-devnet-cardano-evm.c1.milkomeda.com",
        }),
      network_id: 200101,
    },
  },
};
