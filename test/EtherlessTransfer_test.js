const { accounts, contract, web3 } = require('@openzeppelin/test-environment');

const { expect } = require('chai');
require('chai').should();

const { expectEvent, singletons, constants } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const AOV = contract.fromArtifact('AOV');
const EtherlessTransfer = contract.fromArtifact('EtherlessTransfer');

describe('EtherlessTransfer', function () {
    const [registryFunder, creator, recipient1, recipient2, recipient3] = accounts;
    const data = web3.utils.sha3('777TestData');

    beforeEach(async function () {
        this.timeout(3000);
        this.erc1820 = await singletons.ERC1820Registry(registryFunder);
        this.etherless = await EtherlessTransfer.new();
        this.token = await AOV.new(10**10, [this.etherless.address],{from: creator});
        this.token.send(recipient1, 100, data,{from: creator});
        this.token.send(recipient2, 100, data,{from: creator});
    });

    it('Sends without requiring ether from the holder', async function () {
        const hash = await this.etherless.hashForSend(this.token.address,recipient1,recipient2,50,data,1);
        const signature = await web3.eth.sign(hash, recipient1);
        const acc1etherBefore = await web3.eth.getBalance(recipient1);
        const acc2etherBefore = await web3.eth.getBalance(recipient2);
        const acc3etherBefore = await web3.eth.getBalance(recipient3);
        await this.etherless.send(this.token.address,recipient1,recipient2,50,data,1,signature, {from: recipient3});
        const acc1Balance = await this.token.balanceOf(recipient1);
        const acc2Balance = await this.token.balanceOf(recipient2);
        const acc3Balance = await this.token.balanceOf(recipient3);
        expect(acc1Balance).to.eql(web3.utils.toBN(50));
        expect(acc2Balance).to.eql(web3.utils.toBN(150));
        expect(acc3Balance).to.eql(web3.utils.toBN(0));
        const acc1etherAfter = await web3.eth.getBalance(recipient1);
        const acc2etherAfter = await web3.eth.getBalance(recipient2);
        const acc3etherAfter = await web3.eth.getBalance(recipient3);
        expect(acc1etherBefore).to.equal(acc1etherAfter);
        expect(acc2etherBefore).to.equal(acc2etherAfter);
        expect(acc3etherBefore).to.not.equal(acc3etherAfter);
    });
});
