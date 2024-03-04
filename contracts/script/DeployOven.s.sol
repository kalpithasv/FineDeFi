
pragma solidity ^0.8.22;

import "../Oven.sol";
import "forge-std/Script.sol";

contract DeployOven is Script {
    Oven _oven;

    function run() external {
        vm.startBroadcast();

        _oven = new Oven();
        console.log(address(_oven));
    }
}  