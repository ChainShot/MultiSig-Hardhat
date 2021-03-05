const { assert } = require('chai');
describe('MultiSig', function () {
    let contract;
    let accounts;
    beforeEach(async () => {
        accounts = await ethers.provider.listAccounts();
        const MultiSig = await ethers.getContractFactory("MultiSig");
        contract = await MultiSig.deploy(accounts.slice(0, 3), 1);
        await contract.deployed();
    });

    describe('storing ether', function () {
        const oneEther = ethers.utils.parseEther("1");
        beforeEach(async () => {
            await ethers.provider.getSigner(0).sendTransaction({ to: contract.address, value: oneEther });
        });

        it('should store the balance', async () => {
            const balance = await ethers.provider.getBalance(contract.address);
            assert.equal(balance.toString(), oneEther.toString());
        });

        describe('executing the ether transaction', function () {
            let balanceBefore;

            beforeEach(async () => {
                balanceBefore = await ethers.provider.getBalance(accounts[1]);
                await contract.submitTransaction(accounts[1], oneEther, "0x");
            });

            it('should have removed the contract balance', async () => {
                const balance = await ethers.provider.getBalance(contract.address);
                assert.equal(balance, 0);
            });

            it('should have moved the balance to the destination', async () => {
                const balance = await ethers.provider.getBalance(accounts[1]);
                assert.equal(balance.sub(balanceBefore).toString(), oneEther.toString());
            });
        });
    });
});
