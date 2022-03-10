const main = async () => {
  /*
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal'); // NOTE: WavePortal.sol のコンパイルを実行する
  const waveContract = await waveContractFactory.deploy(); // NOTE: ローカルのEthereumネットワークを新規作成する。（スクリプト終了後、ローカルEthereumネットワークは破棄される）
  const wavePortal = await waveContract.deployed(); // NOTE: ローカルEthereumネットワークに向けてdeployされ、スマートコントラクトを組み込むためのマイナーを作成し、マイニング作業が完了後、ローカルEthereumネットワークにスマートコントラクトが組み込まれ、deployが完了する

  console.log(`WavePortal deployed to: ${wavePortal.address}`);
  console.log(`WavePortal deployed by: ${owner.address}`);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
  */

  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await waveContractFactory.deploy();

  console.log('Contract added to:', waveContract.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  console.log(waveCount.toNumber());

  // wave を送る
  let waveTxn = await waveContract.wave('A message!');
  await waveTxn.wait();

  const [_, randomPerson] = await hre.ethers.getSigners();
  waveTxn = await waveContract.connect(randomPerson).wave('Another message!');
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
