const AOV = artifacts.require("./AOV.sol");
const { singletons } = require("@openzeppelin/test-helpers");

contract('AOV', (accounts,registryFunder,creator) =>{
    before(async()=>{
        this.erc1820 = await singletons.ERC1820Registry(registryFunder);
        this.AOV = await AOV.deployed()
    })
    
    it('deployed Successfully', async()=>{
        const address = await this.AOV.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('Balance == totalSupply', async()=>{
        const balance = await this.AOV.balanceOf(accounts[0])
        const supply = await this.AOV.totalSupply()
        assert.equal(balance.toNumber(), supply.toNumber())
    })
})