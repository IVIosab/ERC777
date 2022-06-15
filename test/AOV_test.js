const AOV = artifacts.require("./AOV.sol");
const { singletons } = require("@openzeppelin/test-helpers");

contract('AOV', (accounts,registryFunder,creator) =>{
    const initialSupply = 10000;
    const name = "AttackOnVapers";
    const symbol = "AOV";
    const granularity = 1;
    const decimals = 18;

    before(async()=>{
        this.erc1820 = await singletons.ERC1820Registry(registryFunder);
        this.AOV = await AOV.deployed();
    })
    
    it('deployed successfully', async()=>{
        const address = await this.AOV.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    })

    it('returns correct totalSupply', async()=>{
        const tokenSupply = await this.AOV.totalSupply();
        assert.equal(initialSupply, tokenSupply.toNumber());
    })
    
    it('returns correct name of token', async()=>{
        const tokenName = await this.AOV.name();
        assert.equal(name, tokenName);
    })
    
    it('returns correct symbol of token', async()=>{
        const tokenSymbol = await this.AOV.symbol();
        assert.equal(symbol, tokenSymbol);
    })

    it('returns correct granularity', async()=>{
        const tokeGranularity = await this.AOV.granularity();
        assert.equal(granularity, tokeGranularity);
    })

    it('returns correct decimals', async()=>{
        const tokenDecimals = await this.AOV.decimals();
        assert.equal(decimals, tokenDecimals);
    })
    
    it('owner\'s balance == totalSupply', async()=>{
        const balance = await this.AOV.balanceOf(accounts[0])
        const supply = await this.AOV.totalSupply()
        assert.equal(balance.toNumber(), supply.toNumber())
    })

})