pragma solidity ^0.4.21;

contract Mandate {
    
    uint256 public bankAccount;
    uint256 public totalPrice;
    uint256 public no_installments;
    string public dueDate;
    address public owner;
    
    mapping (address => uint256) public wallet;
    
   constructor () public{
        
        owner = msg.sender;
        bankAccount = 1234;
        totalPrice = 500;
        no_installments = 5;
        dueDate = "1/1";
        
        
        
    }
    
    function setBankAccount(uint256 _bankAccount) public {
        
        wallet[owner] = _bankAccount;
    }
    
    function getBankAccount(address _address) public constant returns(uint256){
        
        return wallet[_address];
    }
    
    function getInstallments(uint256 _totalPrice, uint256 _no_installments) public constant returns (uint256){
        
        return (_totalPrice / _no_installments);
    }
}