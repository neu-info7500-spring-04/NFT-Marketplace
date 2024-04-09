const { ethers } = require("ethers");


const foundryApiKey = "";
const foundryUrl = "https://api.foundrydao.com/v1/";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const provider = new ethers.providers.JsonRpcProvider(foundryUrl);
  const accounts = await provider.listAccounts();

  for (const account of accounts) {
    console.log(account);
  }
});

module.exports = {
  defaultNetwork: "foundry",
  networks: {
    foundry: {
      url: foundryUrl,
      accounts: [], 
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
