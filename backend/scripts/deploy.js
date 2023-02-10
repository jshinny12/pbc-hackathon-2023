async function main() {
  const Crowdfunding = await ethers.getContractFactory("Crowdfunding")

  // Start deployment, returning a promise that resolves to a contract object
  const crowdfunding = await Crowdfunding.deploy()
  await crowdfunding.deployed()
  console.log("Contract deployed to address:", crowdfunding.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
