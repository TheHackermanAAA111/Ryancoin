pragma solidity >= 0.4.22 <0.9.0;

import "./DappToken.sol";

contract DappTokenSale{
    address payable admin;
    DappToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    constructor (DappToken _tokenContract, uint _tokenPrice) public {
        //assign the admin
    admin = msg.sender;
        //token contract
    tokenContract = _tokenContract;
        //token price
    tokenPrice = _tokenPrice;
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(x == 0 || y == 0 || (z = x * y)/y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        // require value is equal to tokens
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        // require contract has enough tokens
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        // require transfer is successful
        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        // keep track of tokens sold
        tokensSold += _numberOfTokens;

        //trigger sell event
        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public payable {
        require(msg.sender == admin);
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

        // UPDATE: Let's not destroy the contract here
        // Just transfer the balance to the admin
        admin.transfer(address(this).balance);
    }
}
