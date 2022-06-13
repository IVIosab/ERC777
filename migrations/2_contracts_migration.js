const AOV = artifacts.require("./AOV.sol");

require('@openzeppelin/test-helpers/configure')({ provider: web3.currentProvider, environment: 'truffle'});
const {singletons} = require('@openzeppelin/test-helpers');

module.exports = async function (deployer, network, accounts) {
  deployer.deploy(AOV,10000,[]);
};
