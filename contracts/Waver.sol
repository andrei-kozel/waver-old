// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Waver {
    uint256 totalWaves;
    mapping(address => uint) wavers;
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address from;
        uint256 timestamp;
        string message;
    }
    Wave[] waves;

    constructor() {
        console.log("I AM SMARTEST CONTRACT. POG.");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        wavers[msg.sender] += 1;

        console.log("%s waved w/ message %s", msg.sender, _message);
        console.log("You waved %s times!", wavers[msg.sender]);

        waves.push(
            Wave({
                from: msg.sender,
                timestamp: block.timestamp,
                message: _message
            })
        );

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWavers() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
