// SPDX-License-Identifier: MIT
pragma solidity  >= 0.7.0 <0.9.0;

contract CrowdFunding{


struct Request{
string description;
address payable  recipient;    
uint value;
bool completed;
uint noOfVoters;
mapping (address => bool) voters;
}



mapping(address => uint) public contributors;
mapping  (uint => Request) public  requests;
uint public  numofRequests;  
address public manager;
uint public minimumContribution;
uint public deadline;
uint public target;
uint public raisedAmount;
uint public noOfContributors;


constructor(uint _target , uint _deadline){
    target = _target;
    deadline = block.timestamp + _deadline;
    minimumContribution = 100 wei;
    manager = msg.sender;
}


modifier  onlyManager (){
    require(msg.sender == manager , "You're not the manager");
    _;
}


function createRequest(string calldata description , address payable  recipient ,uint value ) public  onlyManager  {

        Request storage newRequest = requests[numofRequests];
        numofRequests++;
        newRequest.description = description;
        newRequest.recipient = recipient;
        newRequest.value = value;
        newRequest.completed = false;
        newRequest.noOfVoters = 0;


}


function contribution() public payable  {
require( block.timestamp < deadline , "Deadline has passed");
require(msg.value >= minimumContribution , "Minimum contribution required is 100 wei");


if(contributors[msg.sender] == 0 ){
    noOfContributors++;
}     

contributors[msg.sender] += msg.value;
raisedAmount += msg.value;


}

function getContractBalance() public view returns (uint){
    return address(this).balance;
}

function refund() public {
    require(block.timestamp > deadline && raisedAmount<target , "You're not eligible for refund");
    require(contributors[msg.sender]>0 , "You're not even a contributor yet");
    payable(msg.sender).transfer(contributors[msg.sender]);
    contributors[msg.sender] = 0;

}


function  voteRequest(uint _requestNo) public  {
require(contributors[msg.sender] > 0 , "You're not a contributor");
Request storage  thisrequest = requests[_requestNo];

require(thisrequest.voters[msg.sender] == false , "You've already voted");

thisrequest.voters[msg.sender] = true;
thisrequest.noOfVoters++;

}


function makePayment(uint _requestNo)  public onlyManager {
        require(raisedAmount >=target , "The target is not reached");
        Request storage thisRequest = requests[_requestNo];
        require(thisRequest.completed == false, "This request is already completed");
        require(thisRequest.noOfVoters > noOfContributors/2 , "Majority of contributors do not support this request");
        thisRequest.recipient.transfer(thisRequest.value);
        thisRequest.completed = true;



}


}