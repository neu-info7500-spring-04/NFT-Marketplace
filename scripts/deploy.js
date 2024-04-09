const { ethers } = require("ethers");
const fetch = require("node-fetch");
const fs = require("fs");

async function main() {
  const foundryApiKey = ""; 
  const foundryUrl = "https://api.foundrydao.com/v1"; 

  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const Marketplace = await ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();

  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format("json")),
  };

  fs.writeFileSync("./src/Marketplace.json", JSON.stringify(data));

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${foundryApiKey}`,
    },
    body: JSON.stringify({
      contractName: "NFTMarketplace",
      contractAddress: marketplace.address,
      contractABI: JSON.parse(marketplace.interface.format("json")),
    }),
  };

  const response = await fetch(`${foundryUrl}/contracts`, requestOptions);
  const responseData = await response.json();

  if (response.ok) {
    console.log("Contract deployed successfully on Foundry:", responseData);
  } else {
    throw new Error("Failed to deploy contract on Foundry:", responseData);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
