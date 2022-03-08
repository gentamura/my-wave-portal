const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal'); // NOTE: WavePortal.sol のコンパイルを実行する
  const waveContract = await waveContractFactory.deploy(); // NOTE: ローカルのEthereumネットワークを新規作成する。（スクリプト終了後、ローカルEthereumネットワークは破棄される）
  const wavePortal = await waveContract.deployed(); // NOTE: ローカルEthereumネットワークに向けてdeployされ、スマートコントラクトを組み込むためのマイナーを作成し、マイニング作業が完了後、ローカルEthereumネットワークにスマートコントラクトが組み込まれ、deployが完了する

  console.log(`WavePortal address: ${wavePortal.address}`);
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
