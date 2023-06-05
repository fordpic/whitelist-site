# Forps NFT Collection Whitelist Site

This repo contains the code for both the whitelist contract and the frontend UI for interacting with the Forps NFT collection whitelist, which must be joined before a user can mint a Forp.

Users first must connect to the site by using their wallet to sign in; once connected to Goerli, simply select the button to add your wallet to the Forps whitelist! The UI will let you know whether or not there is space on the whitelist or if you have already whitelisted the connected wallet - **each wallet can mint a maximum of 1 Forp NFT**.

Whitelisted users can mint their Forp NFTs from the minting site, which can be found here: [Forps Mint Site](https://forp-collection.vercel.app/)

The repo containing all of the contracts and frontend code for the Forps NFT collection can be found here: [Forps NFT Collection](https://github.com/fordpic/forp-collection)

## Technologies Used

- NextJS for the web framework
- Solidity for the smart contracts
- TailwindCSS for frontend styling
- Ethers for the web3 frontend library
- Hardhat for smart contract deployment
- Quicknode for the RPC endpoint

## Next Steps

Though the Forps whitelist site sits currently at MVP, it feels that this project has run its course and that it is complete in its current form. I might make some minor changes here and there, such as converting Hardhat deployment and configuration files over to TypeScript and adding TypeChain to autogenerate contract types for the frontend, however I will likely work to just incorporate these things in my next Solidity project.
