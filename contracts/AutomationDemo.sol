// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

contract AutomationDemo is KeeperCompatibleInterface {
    uint256 public constant SIZE = 100;
    uint256 public constant INITIAL_BALANCE = 1000;
    uint256[SIZE] public balances;
    
    constructor() {
        for (uint256 i = 0; i < SIZE; i++) {
            balances[i] = INITIAL_BALANCE;
        }
    }
    
    function withdraw(uint256 amount, uint256[] memory indexs) public {
        for (uint256 i = 0; i < indexs.length; i++) {
            balances[indexs[i]] -= amount;
        }
    }
    
    function checkUpkeep(bytes calldata)
    external
    view
    override
    returns (bool upkeepNeeded, bytes memory performData)
    {
        upkeepNeeded = false;
        for (uint256 i = 0; i < SIZE && !upkeepNeeded; i++) {
            if (balances[i] < INITIAL_BALANCE) {
                upkeepNeeded = true;
            }
        }
        return (upkeepNeeded, "");
    }
    
    function performUpkeep(bytes calldata) external override {
        for (uint256 i = 0; i < SIZE; i++) {
            if (balances[i] < INITIAL_BALANCE) {
                balances[i] = INITIAL_BALANCE;
            }
        }
    }
}
