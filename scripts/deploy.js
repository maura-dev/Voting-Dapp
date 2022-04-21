const {ethers} = require('ethers')
const hre = require("hardhat");
const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  
  console.log("deploying contracts with account ", deployer.address);
  console.log("account balance ", accountBalance.toString());
  
  const electionContractFactory = await hre.ethers.getContractFactory("Election");
  const electionContract = await electionContractFactory.deploy();
  
  await electionContract.deployed();
  
  console.log("Election contract address: ", electionContract.address)
  
  }
  
  const runMain = async () => {
      try {
          await main();
          process.exit(0)
      } catch (error) {
          console.log(error);
          process.exit(1)
      }
  }
  
  runMain();