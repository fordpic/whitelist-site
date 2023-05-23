const { ethers } = require('hardhat');

async function main() {
	const whitelistContract = await ethers.getContractFactory('Whitelist');
	const deployedWhitelist = await whitelistContract.deploy(20);
	await deployedWhitelist.deployed();

	console.log('Deployed whitelist contract at:', deployedWhitelist.address);
}

// Catch errs
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
