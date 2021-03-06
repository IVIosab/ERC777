const { accounts, contract, web3 } = require('@openzeppelin/test-environment');

const { expect } = require('chai');
require('chai').should();

const { singletons, BN, expectEvent } = require('@openzeppelin/test-helpers');

const AOV = contract.fromArtifact('AOV');
const AOVRecipient = contract.fromArtifact('AOVRecipient');

describe('AOVRecipient', function () {
  const [registryFunder, creator, holder] = accounts;

  const data = web3.utils.sha3('777TestData');

  beforeEach(async function () {
    this.timeout(3000);
    this.erc1820 = await singletons.ERC1820Registry(registryFunder);
    this.token = await AOV.new(10**10, [],{from: creator});
    const amount = new BN(10**10);
    await this.token.send(holder, amount, data, { from: creator });
    this.recipient = await AOVRecipient.new(this.token.address, { from: creator });
  });

  it('sends to a contract from an externally-owned account', async function () {
    const amount = new BN(1000);
    const receipt = await this.token.send(this.recipient.address, amount, data, { from: holder });

    await expectEvent.inTransaction(receipt.tx, AOVRecipient, 'DoneStuff', { from: holder, to: this.recipient.address, amount: amount, userData: data, operatorData: null });

    const recipientBalance = await this.token.balanceOf(this.recipient.address);
    recipientBalance.should.be.bignumber.equal(amount);
  });
});