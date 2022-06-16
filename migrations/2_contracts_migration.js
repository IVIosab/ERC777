const AOV = artifacts.require("./AOV.sol");
const AOVRecipient = artifacts.require("./AOVRecipient.sol");

require('@openzeppelin/test-helpers/configure')({ provider: web3.currentProvider, environment: 'truffle'});
const {singletons} = require('@openzeppelin/test-helpers');

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(AOV,10000,[]);
  const token = await AOV.deployed();
  await deployer.deploy(AOVRecipient, token.address)
};
