// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CarbonCreditModule = buildModule("CarbonCreditModule", (m) => {

  const creditcredit = m.contract("CarbonCredit");

  return { creditcredit };
});

export default CarbonCreditModule;
