const main = async () => {
  // get the owner and random addresses
  const [owner, randomUser] = await hre.ethers.getSigners();
  // get the contract
  const waveContarctFactory = await hre.ethers.getContractFactory("Waver");
  // deploy the contract with some fake $
  const waveContract = await waveContarctFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  // wait for the contract to be mined
  await waveContract.deployed();
  // storing the address with the last time the user waved at us

  console.log("Contract deployed to: ", waveContract.address);
  console.log("contract deployed by: ", owner.address);

  // Get Contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // Send Waves
  const waveTxn = await waveContract.wave("This is wave #1");
  await waveTxn.wait();

  const waveTxn2 = await waveContract.wave("This is wave #2");
  await waveTxn2.wait();

  // Get Contract balance to see what happened!
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
