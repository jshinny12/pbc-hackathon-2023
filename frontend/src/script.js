
const Web3 = require("web3");

const Crowdfunding = require("./artifacts/contracts/Crowdfunding.sol/Crowdfunding.json");


const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000');
const contractAddress = "0x645bf3aCb1aE34788E958039d7d76d2Bcb9Fb767";
const contract = new web3.eth.Contract(Crowdfunding.abi, contractAddress);

const personalAddress = "0xB1bD86E80f7A6286F575F7702618330b6Cd71510"

const main = async () => {
    await contract.methods.createCampaign("Campaign", "image", 100).send({from: personalAddress});
    const campaign = await contract.methods.campaigns(0).call();
    console.log(campaign);
}

const fn = async () => {
    await main();
}

fn();

// await main();
  