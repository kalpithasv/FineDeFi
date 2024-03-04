// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

interface IOneInchAdapter {
    function swapForExactInput(
        IERC20 _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 minAmountOut,
        address _user
    )
        external
        payable;
}
