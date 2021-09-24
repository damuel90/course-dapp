const web3 = require('web3');

const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DecentralBank', ([awner, customer]) => {
    let tether, rwd, decentralBank;

    function tokens(amount) {
        return web3.utils.toWei(amount, 'ether');
    }

    before(async () => {
        tether = await Tether.new();
        rwd = await RWD.new();
        decentralBank= await DecentralBank.new(rwd.address, tether.address);

        await rwd.transfer(decentralBank.address, tokens('1000000'));
        await tether.transfer(customer, tokens('100'));
    })

    describe('Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name();
            assert.equal(name, 'Tether')
        })
    })

    describe('Reward Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name();
            assert.equal(name, 'Reward Token')
        })
    })
})