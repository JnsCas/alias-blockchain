import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { network } from "hardhat";
import { faker } from "@faker-js/faker";
import { getAddress, zeroAddress } from "viem";

function generateRandomAlias(): string {
  return faker.string.alphanumeric({ length: { min: 1, max: 20 } });
}

describe("AliasStorage", async function () {
  const { viem } = await network.connect();
  const addressSender = getAddress((await viem.getWalletClients())[0].account.address);

  it("Should get the address by alias", async function () {
    const aliasStorage = await viem.deployContract("AliasStorage");

    const alias = generateRandomAlias();
    await aliasStorage.write.setAlias([alias]);

    const address = await aliasStorage.read.getAddressByAlias([alias]);

    assert.equal(getAddress(address), addressSender);
  });

  it("Should get the alias by address", async function () {
    const aliasStorage = await viem.deployContract("AliasStorage");

    const alias = generateRandomAlias();
    await aliasStorage.write.setAlias([alias]);

    const retrievedAlias = await aliasStorage.read.getAliasByAddress([addressSender]);

    assert.equal(retrievedAlias, alias);
  });

  it("Should update the old alias when a new alias is set", async function () {
    const aliasStorage = await viem.deployContract("AliasStorage");

    const alias = generateRandomAlias();
    await aliasStorage.write.setAlias([alias]);

    const newAlias = generateRandomAlias();
    await aliasStorage.write.setAlias([newAlias]);

    const retrievedOldAddress = await aliasStorage.read.getAddressByAlias([alias]);
    
    const retrievedAlias = await aliasStorage.read.getAliasByAddress([addressSender]);
    const retrievedAddress = await aliasStorage.read.getAddressByAlias([newAlias]);

    assert.equal(getAddress(retrievedOldAddress), zeroAddress);
    assert.equal(retrievedAlias, newAlias);
    assert.equal(getAddress(retrievedAddress), addressSender);
  });

  it("Should delete the alias when deleteMyAlias is called", async function () {
    const aliasStorage = await viem.deployContract("AliasStorage");

    const alias = generateRandomAlias();
    await aliasStorage.write.setAlias([alias]);

    await aliasStorage.write.deleteMyAlias();

    const retrievedAlias = await aliasStorage.read.getAliasByAddress([addressSender]);
    const retrievedAddress = await aliasStorage.read.getAddressByAlias([alias]);
    
    assert.equal(retrievedAlias, "");
    assert.equal(getAddress(retrievedAddress), zeroAddress);
  });

  it("Should get the alias count", async function () {
    const aliasStorage = await viem.deployContract("AliasStorage");

    const alias = generateRandomAlias();
    await aliasStorage.write.setAlias([alias]);

    const aliasCount = await aliasStorage.read.aliasCount();
    assert.equal(aliasCount.toString(), "1");
  });
});
