// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract CarbonCredit {

    struct company {
        string name;
        uint256 currcredit; 
    }

     uint256 public totalCredit;

    mapping(address => company) public companies;

    constructor(){
        totalCredit = 100;
    }

    function Company(string memory name, uint256 credit) public returns(company memory){
        companies[msg.sender].name = name;
        companies[msg.sender].currcredit = credit;
        return companies[msg.sender];
    }

    function ExchangeCredit(uint256 amount, address source) public {
        companies[source].currcredit -= amount;
        companies[msg.sender].currcredit += amount;
    }

    function BuyCredit(uint256 amount) public {
        totalCredit -= amount;
        companies[msg.sender].currcredit += amount;
    }

    function SellCredit(uint256 amount) public {
        totalCredit += amount;
        companies[msg.sender].currcredit -= amount;
        address payable receiver = payable(msg.sender);
        receiver.transfer(amount * 2 * 1e18);
    }

    function showCredits(address companyaddr) public view returns(uint256) {
        return companies[companyaddr].currcredit;
    }

    fallback() external payable {
    }

    receive() external payable{}

}