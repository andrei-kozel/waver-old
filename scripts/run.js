const main = async () => {
  const [owner, randomUser] = await hre.ethers.getSigners();
  const waveContarctFactory = await hre.ethers.getContractFactory("Waver");
  const waveContract = await waveContarctFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to: ", waveContract.address);
  console.log("contract deployed by: ", owner.address);

  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait();

  waveTxn = await waveContract.connect(randomUser).wave("Another message!");
  await waveTxn.wait();

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
