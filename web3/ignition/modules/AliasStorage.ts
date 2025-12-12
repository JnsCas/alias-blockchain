import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("AliasStorageModule", (m) => {
  const aliasStorage = m.contract("AliasStorage");

  m.call(aliasStorage, "setAlias", ["test"]);

  return { aliasStorage };
});
