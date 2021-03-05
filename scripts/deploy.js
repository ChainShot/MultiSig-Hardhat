const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const accounts = await ethers.provider.listAccounts();
  const MultiSig = await ethers.getContractFactory("MultiSig");
  const multiSig = await MultiSig.deploy(accounts, 2);

  await multiSig.deployed();

  console.log("MultiSig deployed to:", multiSig.address);
  const config = { address: multiSig.address }
  fs.writeFileSync("./app/__config.json", JSON.stringify(config, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
