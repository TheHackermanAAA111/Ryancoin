var DappTokenSale = artifacts.require('./DappTokenSale.sol')
var DappToken = artifacts.require('./DappToken.sol')

contract('DappTokenSale', function(accounts) {
    var tokenSaleInstance;

    it('intializes the contract with the correct values', function() {
        return DappTokenSale.deployed().then(function(instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance.address
        }).then(function(address) {
            assert.notEqual(address, 0x0, 'has contract address');
            return tokenSaleInstance.tokenContract();
        }).token(function(address) {
            assert.notEqual(address, 0x0, 'has token contract address');
            return tokenSaleInstance.tokenPrice();
        }).token(function(price) {
            assert.equal(price, tokenPrice, 'token price is correct');
        });
    });
});
