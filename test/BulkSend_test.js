const { accounts, contract, web3 } = require('@openzeppelin/test-environment');

const { expect } = require('chai');
require('chai').should();

const { expectEvent, singletons, constants } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const AOV = contract.fromArtifact('AOV');
const BulkSend = contract.fromArtifact('BulkSend');

const data = 

describe('AOV', function () {
    const [registryFunder, creator, recipient1, recipient2] = accounts;
    const data = web3.utils.sha3('777TestData');

    beforeEach(async function () {
        this.timeout(3000);
        this.erc1820 = await singletons.ERC1820Registry(registryFunder);
        this.bulk = await BulkSend.new();
        this.token = await AOV.new(10**10, [this.bulk.address],{from: creator});
    });

    it('BulkSends with fixed value', async function () {
        await this.bulk.send(this.token.address, [recipient1,recipient2],10,data,{from: creator})
        const acc1Balance = await this.token.balanceOf(creator); 
        const acc2Balance = await this.token.balanceOf(recipient1); 
        const acc3Balance = await this.token.balanceOf(recipient2); 
        expect(acc1Balance).to.eql(web3.utils.toBN(10**10-20));
        expect(acc2Balance).to.eql(web3.utils.toBN(10));
        expect(acc3Balance).to.eql(web3.utils.toBN(10));
    });
    
    it('BulkSends with different values', async function () {
        await this.bulk.sendAmounts(this.token.address, [recipient1,recipient2],[10,20],data,{from: creator})
        const acc1Balance = await this.token.balanceOf(creator); 
        const acc2Balance = await this.token.balanceOf(recipient1); 
        const acc3Balance = await this.token.balanceOf(recipient2); 
        expect(acc1Balance).to.eql(web3.utils.toBN(10**10-30));
        expect(acc2Balance).to.eql(web3.utils.toBN(10));
        expect(acc3Balance).to.eql(web3.utils.toBN(20));
    });
    
});
