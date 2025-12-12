// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AliasStorage {
  mapping(address => string) public aliasesByAddress;
  mapping(string => address) public addressesByAlias;

  function setAlias(string memory _alias) public {
    require(addressesByAlias[_alias] == address(0), "Alias already exists");
    string memory old_alias = aliasesByAddress[msg.sender];
    if (bytes(old_alias).length > 0) {
      delete addressesByAlias[old_alias];
    }
    aliasesByAddress[msg.sender] = _alias;
    addressesByAlias[_alias] = msg.sender;
  }

  function getAliasByAddress(address addr) public view returns (string memory) {
    return aliasesByAddress[addr];
  }

  function getAddressByAlias(string memory _alias) public view returns (address) {
    return addressesByAlias[_alias];
  }

  function deleteMyAlias() public {
    require(bytes(aliasesByAddress[msg.sender]).length > 0, "You don't have an alias");
    delete addressesByAlias[aliasesByAddress[msg.sender]];
    delete aliasesByAddress[msg.sender];
  }
}
