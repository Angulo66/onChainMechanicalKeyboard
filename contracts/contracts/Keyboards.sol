// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Keyboards {
  string[] public createdKeyboards;

  function getKeyboards() public view returns (string[] memory) {
    return createdKeyboards;
  }

  function create(string calldata _description) external {
    createdKeyboards.push(_description);
  }
}
