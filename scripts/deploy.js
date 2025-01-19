const { ethers } = require("hardhat");

async function main() {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    await voting.deployed;
    console.log(`Voting contract deployed at: ${voting.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})