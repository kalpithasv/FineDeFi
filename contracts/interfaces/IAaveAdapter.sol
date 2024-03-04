// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol";

interface IAaveAdapter {
    function redeem(IERC20Metadata _token, uint256 _amount, address _user) external;

    function supplyAndBorrow(
        IERC20Metadata _depositToken,
        IERC20Metadata _borrowToken,
        uint256 _amount,
        address _user
    )
        external payable;
}
