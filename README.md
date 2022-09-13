**ByteBlock openminter**
A opensource code to mint NFTs. Cloned from tezos OpenMinter

**Start byteblock openminter**

Compile : Before using you must compile the code. Check relevent node and othe package versions.

yarn install

**Build for mainnet**

This will create an optimized build

yarn build:mainnet

**Build for Jakartanet testnet**
We have provided configuration for Jakartanet. config file is available under ./config/testnet.json. 
yarn install
yarn build:testnet
serve -s build
App will start on http://localhost:5000 

Deploy your NFT contract and replace the contract address at nftFaucet. replace testnet marketplace 
contract at marketplace.
**Launch byteblock openminter**

You can start the application by yarn comand. It is using one of the contract deployed by ByteBlock. You may deploy your own NFT and marketplace
contract and use with byteblock openminter.

serve -s build

**Use secondary mint feature**

PFP projects are in boom, that has lot of technical challanges. It includes deploying your Crowdsale Contract and NFT contract, developing your website which
supports minting at different stages. Different stages of minting has different minting prices. It also sets the total number of NFTs.

1- Got to http://localhost:5000/mint

2- Enter your contract address (Ex KT1Vx2WKCVQamsTvSxabqZoBe267oJeXkcvt)

3- Select number of unit (Ex 1)

4- Mint

It will mint on any PFP project. Makesure you are using Crowdsale Contract.

**Support**

Reachout to ByteBlock for any clarification. 
