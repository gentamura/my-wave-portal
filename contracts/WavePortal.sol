// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;

  event NewWave(address indexed from, uint256 timestamp, string message);

  struct Wave {
    address waver; // 👋 (wave)を送ったユーザーのアドレス
    string message; // ユーザーが送ったメッセージ
    uint256 timestamp; // ユーザーが 👋 (wave)を送った瞬間のタイムスタンプ
  }

  Wave[] waves;

  constructor() {
    console.log("Here is my first smart contract!");
  }

  function wave(string memory _message) public {
    totalWaves += 1;
    console.log("%s waved w/ message %s", msg.sender, _message);

    // 👋 (wave)とメッセージを配列に格納
    waves.push(Wave(msg.sender, _message, block.timestamp));

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

