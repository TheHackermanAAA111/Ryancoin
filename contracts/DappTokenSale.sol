pragma solidity >= 0.4.22 <0.9.0;

import "./DappToken.sol";

contract DappTokenSale{
    address admin;
    DappToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

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
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        tokensSold += _numberOfTokens;

    }
}