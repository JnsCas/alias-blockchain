// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AliasStorage {
  mapping(address => string) public aliases;
  mapping(string => address) public addresses;

  function setAlias(string memory _alias) public {
    require(addresses[_alias] == address(0), "Alias already exists");
    aliases[msg.sender] = _alias;
    addresses[_alias] = msg.sender;
  }

  function getAliasByAddress(address addr) public view returns (string memory) {
    return aliases[addr];
  }

  function getAddressByAlias(string memory _alias) public view returns (address) {
    return addresses[_alias];
  }

  function deleteMyAlias() public {
    require(bytes(aliases[msg.sender]).length > 0, "You don't have an alias");
    delete addresses[aliases[msg.sender]];
    delete aliases[msg.sender];
  }
}
