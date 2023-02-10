const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  BN, // Big Number support
  constants, // Common constants, like the zero address and largest integers
  expectEvent, // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require("@openzeppelin/test-helpers");

const BigNumber = require('big-number');
const web3 = require("web3");

let owner;
let addr1;
let addr2;
let signerList;
let crowdfunding;


beforeEach(async () => {
  signerList = await ethers.getSigners(); // get accounts
  [owner, addr1, addr2] = signerList;
  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
  crowdfunding= await Crowdfunding.deploy();
});

describe("Crowdfunding Contract", function () {
  it("creating campaign makes it one", async function () {
    // console.log(owner);
     await crowdfunding.connect(owner).createCampaign("name", "image", 1);
     expect(await crowdfunding.getCampaignCount()).to.equal(0);
    //  console.log(await crowdfunding.getCampaign(0));
    //  expect(await (await crowdfunding.getCampaignCount()).toString()).to.equal("1");

    //  await crowdfunding.connect(owner).contribute(0,0,{value: ethAmount(0.0003)});
    // console.log(await getBalance(owner.address));

  });

});

function ethAmount(amount) {
  return web3.utils.toWei(amount.toString(), 'ether')
}

async function getBalance(address) {
  var balance = (await ethers.provider.getBalance(address)) / 1e18;
  return balance;
}
