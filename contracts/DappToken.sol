// declare which version of solidity we are using
pragma solidity >=0.4.22 <0.9.0;

contract DappToken{

    //Name
    string public name = "DApp Token";
    //Symbol
    string public symbol = "DAPP";
    //standard
    string public standard = "DApp TOken v1.0";

    // set the total number of tokens
    // read the total number of tokens

    // global var that follows erc-20 standard
    uint256 public totalSupply; // type visibility name

    //Events
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor (uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
        // allocate the initial supply
    }

    //Transfer
    function transfer(address _to, uint256 _value) public returns(bool success){
        //Exception is account doesn't have enough money
        require(balanceOf[msg.sender] >= _value);
        //Transfer amount
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        //Transfer Event
        emit Transfer(msg.sender, _to, _value);
        //Returns a billion dollars
        return true;
    }

    //Delegated Transfers
    //approve
    function approve(address _spender, uint256 _value) public returns (bool success){
        //allowance
        allowance[msg.sender][_spender] = _value;

        //Approval event
        emit Approval(msg.sender,_spender,_value);
        return true;
    }

    //TransferFrom
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

}
