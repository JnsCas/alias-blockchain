// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { AliasStorage } from "./AliasStorage.sol";
import { Test } from "forge-std/Test.sol";

contract AliasStorageTest is Test {
  AliasStorage aliasStorage;

  function setUp() public {
    aliasStorage = new AliasStorage();
  }

  function test_SetAlias() public {
    aliasStorage.setAlias("test");
    assertEq(aliasStorage.getAliasByAddress(address(this)), "test");
    assertEq(aliasStorage.getAddressByAlias("test"), address(this));
  }

  function test_GetAddress() public {
    aliasStorage.setAlias("test2");
    assertEq(aliasStorage.getAddressByAlias("test2"), address(this));
  }

  function test_GetAliasByAddress() public {
    aliasStorage.setAlias("test4");
    assertEq(aliasStorage.getAliasByAddress(address(this)), "test4");
  }

  function test_DeleteMyAlias() public {
    aliasStorage.setAlias("test3");
    aliasStorage.deleteMyAlias();
    assertEq(bytes(aliasStorage.getAliasByAddress(address(this))).length, 0);
    assertEq(aliasStorage.getAddressByAlias("test3"), address(0));
  }

}
