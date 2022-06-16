const AOV = artifacts.require("./AOV.sol");
const AOVRecipient = artifacts.require("./AOVRecipient.sol");
const BulkSend = artifacts.require("./BulkSend.sol");

require('@openzeppelin/test-helpers/configure')({ provider: web3.currentProvider, environment: 'truffle'});
const {singletons} = require('@openzeppelin/test-helpers');

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(BulkSend);
  const BulkSendOperator = await BulkSend.deployed();
  await deployer.deploy(AOV,10000,[BulkSendOperator.address]);
  const token = await AOV.deployed();
  await deployer.deploy(AOVRecipient, token.address)
};
