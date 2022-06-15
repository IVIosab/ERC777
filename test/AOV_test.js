const { accounts, contract, web3 } = require('@openzeppelin/test-environment');

const { expect } = require('chai');
require('chai').should();

const { expectEvent, singletons, constants } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const AOV = contract.fromArtifact('AOV');

describe('AOV', function () {
    const [registryFunder, creator, operator] = accounts;

    beforeEach(async function () {
        this.erc1820 = await singletons.ERC1820Registry(registryFunder);
        this.token = await AOV.new(10000, [],{from: creator});
    });

    it('returns correct name of token', async function () {
        expect(await this.token.name()).to.equal('AttackOnVapers');
    });

    it('returns correct symbol of token', async function () {
        expect(await this.token.symbol()).to.equal('AOV');
    });
    
    it('returns correct totalSupply of token', async function () {
        expect(await this.token.totalSupply()).to.eql(web3.utils.toBN(10000));
    });

    it('returns correct granularity', async function () {
        expect(await this.token.granularity()).to.eql(web3.utils.toBN(1));
    });

    it('returns correct decimals', async function () {
        expect(await this.token.decimals()).to.eql(web3.utils.toBN(18));
    });

    it('owner\'s balance == totalSupply', async function () {
        const totalSupply = await this.token.totalSupply();
        const creatorBalance = await this.token.balanceOf(creator);
        expect(creatorBalance).to.eql(totalSupply)
        await expectEvent.inConstruction(this.token, 'Transfer', {
            from: ZERO_ADDRESS,
            to: creator,
            value: totalSupply,
        });
    });
});
