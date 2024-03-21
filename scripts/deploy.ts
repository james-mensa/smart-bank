const fs = require("fs/promises");

import hre from "hardhat"
async function main() {  
  const AllSigners = await ethers.getSigners();
  // const BankAccount = await hre.ethers.getContractFactory("BankAccount","ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f");
  const BankAccount = await hre.ethers.getContractFactory("BankAccount",AllSigners[0]);
  const bankAccount = await BankAccount.deploy();

  await bankAccount.deployed();
    
  // const lock = await ethers.deployContract("BankAccount", );

  // await lock.waitForDeployment();

  writeDeploymentInfo(bankAccount);
}



async function writeDeploymentInfo(contract:any) {
  const data = {
    contract: {
      address: contract.address,
      signerAddress: contract.signer.address,
      abi: contract.interface.format(),
    },
  };
  const content = JSON.stringify(data, null, 2);
  await fs.writeFile("deployment.json", content, { encoding: "utf-8" });
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



