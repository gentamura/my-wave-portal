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

  /*
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
  */

  /*
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');

  // デプロイする際0.1ETHをコントラクトに提供する
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });

  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);

  // コントラクトのバランスを取得（0.1ETH）であることを確認
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // Waveを取得
  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait();

  // コントラクトのバランスを取得し、Waveを取得した後の結果を出力
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

  // 契約の残高から0.0001ETH引かれていることを確認
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
  */

  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');

  // デプロイする際0.1ETHをコントラクトに提供する
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });

  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);

  // コントラクトの残高を取得（0.1ETH）であることを確認
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // 2回 waves を送るシミュレーションを行う
  const waveTxn = await waveContract.wave("This is wave #1");
  await waveTxn.wait();

  const waveTxn2 = await waveContract.wave("This is wave #2");
  await waveTxn2.wait();

  // コントラクトの残高を取得し、Waveを取得した後の結果を出力
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

  // コントラクトの残高から0.0001ETH引かれていることを確認
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
