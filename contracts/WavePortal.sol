// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;

  // 乱数生成のための基盤となるシード（種）を作成
  uint256 private seed;

  event NewWave(address indexed from, uint256 timestamp, string message);

  struct Wave {
    address waver; // 👋 (wave)を送ったユーザーのアドレス
    string message; // ユーザーが送ったメッセージ
    uint256 timestamp; // ユーザーが 👋 (wave)を送った瞬間のタイムスタンプ
  }

  Wave[] waves;

  // "address => uint mapping"は、アドレスと数値を関連付ける
  mapping(address => uint256) public lastWavedAt;

  // payable で送金機能を有効化する
  constructor() payable {
    console.log("Here is my first smart contract!");

    // 初期シードを設定
    seed = (block.timestamp + block.difficulty) % 100;
  }

  function wave(string memory _message) public {
    // 現在ユーザーがwaveを送信している時刻と、前回waveを送信した時刻が15分以上離れていることを確認。
    require(
      lastWavedAt[msg.sender] + 30 seconds < block.timestamp,
      "Wait 15m"
    );

    // ユーザーの現在のタイムスタンプを更新する
    lastWavedAt[msg.sender] = block.timestamp;

    totalWaves += 1;
    console.log("%s waved w/ message %s", msg.sender, _message);

    // 👋 (wave)とメッセージを配列に格納
    waves.push(Wave(msg.sender, _message, block.timestamp));

    // ユーザーのために乱数を生成
    seed = (block.difficulty + block.timestamp + seed) % 100;

    console.log("Random # generated: %d", seed);

    // ユーザーがETHを獲得する確率を50％に設定
    if (seed <= 50) {
      console.log("%s won!", msg.sender);

      // 👋 (wave)を送ってくれたユーザーに0.0001ETHを送る
      uint256 prizeAmount = 0.0001 ether;

      // ユーザーに送る ETH の額がコントラクトが持つ残高より下回っていることをチェック
      require(
        prizeAmount <= address(this).balance,
        "Trying to withdraw more money than the contract has."
      );

      // ユーザーに送金する処理
      (bool success, ) = (msg.sender).call{ value: prizeAmount }("");

      // 送金が成功しているかのチェック
      require(success, "Failed to withdraw from contract.");
    } else {
      console.log("%s did not win.", msg.sender);
    }

    // コントラクト側でemitされたイベントに関する通知をフロントエンドで取得できるようにする
    emit NewWave(msg.sender, block.timestamp, _message);
  }

  function getAllWaves() public view returns(Wave[] memory) {
    return waves;
  }

  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }
}

