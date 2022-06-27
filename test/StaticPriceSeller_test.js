const { accounts, contract, web3 } = require('@openzeppelin/test-environment');

const { expect } = require('chai');
require('chai').should();

const { expectEvent, singletons, constants } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const AOV = contract.fromArtifact('AOV');
const StaticPriceSeller = contract.fromArtifact('StaticPriceSeller');

describe('AOV', function () {
    const [registryFunder, creator, recipient1, recipient2, recipient3] = accounts;
    const data = web3.utils.sha3('777TestData');

    beforeEach(async function () {
        this.timeout(3000);
        this.erc1820 = await singletons.ERC1820Registry(registryFunder);
        this.static = await StaticPriceSeller.new();
        this.token = await AOV.new(10**10, [this.static.address],{from: creator});
        this.token.send(recipient1, 100, data,{from: creator});
        this.token.send(recipient2, 100, data,{from: creator});
    });

    it('all functions work', async function () {
        await this.static.setPricePerToken(this.token.address, 100,{from: recipient1})
        const acc1Price = await this.static.getPricePerToken(this.token.address, recipient1);  
        expect(acc1Price).to.eql(web3.utils.toBN(100));
        await this.static.send(this.token.address, recipient1, {from: recipient3, value: 1000});
        const acc1Balance = await this.token.balanceOf(recipient1);
        const acc2Balance = await this.token.balanceOf(recipient2);
        const acc3Balance = await this.token.balanceOf(recipient3);
        expect(acc1Balance).to.eql(web3.utils.toBN(90));
        expect(acc2Balance).to.eql(web3.utils.toBN(100));
        expect(acc3Balance).to.eql(web3.utils.toBN(10));
    });
});
