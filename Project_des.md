# CrowdFunding Smart Contract

## Overview

This Solidity smart contract implements a simple crowdfunding platform where contributors can donate funds to a campaign. If the campaign reaches its target amount, the manager can create spending requests. Contributors can vote on these requests, and once a majority approves, the funds can be transferred to the recipient.
 
## Features

- **Contribution**: Contributors can donate to the campaign.
- **Request Creation**: The manager can create spending requests.
- **Voting**: Contributors can vote on requests.
- **Payment**: Approved requests can be paid out.
- **Refund**: Contributors can get refunds if the target is not met by the deadline.

## Contract Details

### Variables

- `manager`: The address of the campaign manager who creates spending requests.
- `minimumContribution`: Minimum amount required to become a contributor.
- `deadline`: Timestamp by which the campaign should meet its target.
- `target`: The fundraising goal.
- `raisedAmount`: Total amount of funds raised.
- `noOfContributors`: Number of unique contributors.
- `contributors`: Mapping of contributor addresses to their contributed amount.
- `requests`: Mapping of request IDs to spending requests.
- `numofRequests`: Number of spending requests created.

### Structs

- `Request`: Represents a spending request with details such as description, recipient, value, completion status, and voter count.

### Modifiers

- `onlyManager`: Restricts function access to the manager only.

### Functions

#### Constructor

```solidity
constructor(uint _target, uint _deadline)
```
Initializes the contract with a target amount and deadline. Sets the minimum contribution to 100 wei and assigns the manager.

#### createRequest

```solidity
function createRequest(string calldata description, address payable recipient, uint value) public onlyManager
```
Allows the manager to create a new spending request.

#### contribution

```solidity
function contribution() public payable
```
Allows users to contribute funds. Ensures the contribution meets the minimum amount and is made before the deadline.

#### getContractBalance

```solidity
function getContractBalance() public view returns (uint)
```
Returns the current balance of the contract.

#### refund

```solidity
function refund() public
```
Allows contributors to request a refund if the campaign has not met its target by the deadline.

#### voteRequest

```solidity
function voteRequest(uint _requestNo) public
```
Allows contributors to vote on a spending request. Ensures each contributor votes only once.

#### makePayment

```solidity
function makePayment(uint _requestNo) public onlyManager
```
Allows the manager to make a payment for an approved request. Ensures the request has majority approval and is not already completed.

## Usage Instructions

1. **Deployment**: Deploy the contract with a specific `target` and `deadline`.
2. **Contribute**: Call `contribution` to donate funds. Ensure the amount is above the minimum contribution and before the deadline.
3. **Create Request**: Once the target is met, the manager can call `createRequest` to propose spending funds.
4. **Vote on Request**: Contributors can call `voteRequest` to approve or reject the spending requests.
5. **Make Payment**: The manager can call `makePayment` to release funds for approved requests.
6. **Refund**: If the target is not met by the deadline, contributors can call `refund` to get their contributions back.

## Considerations

- Ensure the manager is a trusted entity as they have control over request creation and payment.
- Contributors should vote on requests to ensure funds are used appropriately.
- Refunds are only available if the campaign fails to meet its target by the deadline.
