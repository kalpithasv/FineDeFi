// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

interface IDataProvider {
    function getReserveTokensAddresses(address asset) external view returns (address, address, address);
}
