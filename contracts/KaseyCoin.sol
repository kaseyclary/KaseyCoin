// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KaseyCoin is ERC20{
  uint storedData;

  mapping(address => string) usernames;

  constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol){
    _mint(msg.sender, initialSupply);
  }

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function getUserAddress() public view returns (address) {
    return msg.sender;
  }

  function setUserName(string memory _username) private {
    usernames[msg.sender] = _username;
  }

  function getUserName() public view returns (string memory) {
    usernames[msg.sender];
  }

}
