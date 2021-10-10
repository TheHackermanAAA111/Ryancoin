var DappToken = artifacts.require("./DappToken.sol")

contract('DappToken', function(accounts) {
    var tokenInstance;
    it ('initializes the contract with the correct values', function(){
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name){
            assert.equal(name, 'DApp Token', 'has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol){
            assert.equal(symbol, 'DAPP', 'has the correct symbol');
            return tokenInstance.standard();
        }).then(function(standard){
            assert.equal(standard, 'DApp TOken v1.0', 'has the correct standard');
        });
    })
    it('sets the total supply upon deployment', function() {
        return DappToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 1000000, 'set the total supply to 1,000,000');
            return tokenInstance.balanceOf(accounts[0])
        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the intial supply to the admin account');
        });
    });
    it('transfer token ownership', function(){
        return DappToken.deployed().then(function(instance){
            tokenInstance = instance;
            //test 'require' statement first by transferring something larger than the sender's balance
            return tokenInstance.transfer.call(accounts[1], 9999999999999);
        }).then(assert.fail).catch(function(error){
            assert(error.message.toString().indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]});
        }).then(function(success){
            assert.equal(success, true, 'It returns true');
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0]});
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'Confirming this is a Transfer event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'Logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'Logs the account the tokens are transfered to');
            assert.equal(receipt.logs[0].args._value, 250000, 'Logs the transfer amount');

            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 750000, 'deducts the amount from the sending account');
        });
    });
    it('approves tokens for delegated transfer', function(){
        return DappToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function(success){
            assert.equal(success, true, 'It returns true');
            return tokenInstance.approve(accounts[1],100, { from: accounts[0]});
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Approval', 'Confirming this is an Approval event');
            assert.equal(receipt.logs[0].args._owner, accounts[0], 'Logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._spender, accounts[1], 'Logs the account the tokens are transfered to');
            assert.equal(receipt.logs[0].args._value, 100, 'Logs the transfer amount');
            return tokenInstance.allowance(accounts[0], accounts[1]);
        }).then(function(allowance){
            assert.equal(allowance.toNumber(), 100, 'stores the allowance of delegated transfer');
        });
    });
    it('handles delegated token transfers', function(){
        return DappToken.deployed().then(function(instance){
            tokenInstance = instance;
            fromAccount = accounts[2];
            toAccount = accounts[3];
            spendingAccount = accounts[4];
            // Transfer some tokens from fromAccount
            return tokenInstance.transfer(fromAccount, 100, {from: accounts[0]});
        }).then(function(receipt){
            // Approve spendingAccount to spend 10 tokens from fromAccount
            return tokenInstance.approve(spendingAccount, 10, {from: fromAccount});
        }).then(function(receipt){
            // Attempt transferring something larger than the sender's balance
            return tokenInstance.transferFrom(fromAccount, toAccount, 9999, {from: spendingAccount});
        }).then(assert.fail).catch(function(error){
            assert(error.message.toString().indexOf('revert') >= 0 , 'cannot transfer value larger than balance');
            return tokenInstance.transferFrom(fromAccount, toAccount, 20, {from: spendingAccount});
        }).then(assert.fail).catch(function(error){
            assert(error.message.toString().indexOf('revert') >= 0 , 'cannot transfer value larger than approved amount');
            return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, {from: spendingAccount});
        }).then(function(success){
            assert.equal(success, true);
            return tokenInstance.transferFrom(fromAccount, toAccount, 10, {from: spendingAccount});
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'Confirming this is a Transfer event');
            assert.equal(receipt.logs[0].args._from, fromAccount, 'Logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, toAccount, 'Logs the account the tokens are transfered to');
            assert.equal(receipt.logs[0].args._value, 10, 'Logs the transfer amount');
        });
    });

});
