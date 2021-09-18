// declare which version of solidity we are using
pragma solidity >=0.4.22 <0.9.0;

contract DappToken{

    // constructor
    // set the total number of tokens
    // read the total number of tokens

    // global var that follows erc-20 standard
    uint256 public totalSupply; // type visibility name

    mapping(address => uint256) public balanceOf;

    constructor (uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
        // allocate the initial supply
    }


}
