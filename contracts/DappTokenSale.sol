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
}
