// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "../interfaces/IWETHGateway.sol";
import "../interfaces/IPoolAddressProvider.sol";
import "../interfaces/ILendingPoolV3.sol";
import "../interfaces/IAToken.sol";
import "../interfaces/IDataProvider.sol";
import "../interfaces/IAaveAdapter.sol";
import "../interfaces/IWETH.sol";
import "../interfaces/IWETH.sol";
import "../interfaces/IAggregator.sol";
import { mulDiv } from "@prb/math/src/Common.sol";

contract AaveAdapter is IAaveAdapter {
    /// @notice Address of the weth gateway contract
    IWETHGateway public immutable wethGateway;

    /// @notice Lending pool address
    ILendingPoolV3 public immutable lendingPool;

    /// @notice wrapped token address like wamtic or weth
    IWETH public immutable weth;

    /// @notice AaveProtocolDataProvider address
    IDataProvider public immutable dataProvider;

    /// @notice chainlink aggregator address
    IAggregator public immutable aggregator;

    /// @notice oven address (parent forwarder)
    address public immutable oven;

    constructor(
        address _oven,
        IPoolAddressProvider _poolAddressesProvider,
        IWETHGateway _wethGateway,
        IDataProvider _dataProvider,
        IWETH _weth,
        IAggregator _aggregator
    ) {
        oven = _oven;
        lendingPool = ILendingPoolV3(address(0));
        wethGateway = _wethGateway;
        dataProvider = _dataProvider;
        weth = _weth;
        aggregator = _aggregator;
    }

    function supplyAndBorrow(IERC20Metadata _depositToken, IERC20Metadata _borrowToken, uint256 _amount, address _user) external payable {
        if (msg.sender != oven) revert();
        if (address(_depositToken) == address(0) || address(_depositToken) == address(weth)) {
            if (address(_depositToken) == address(weth)) {
                // unwraps WrappedToken back into Native Token
                weth.withdraw(_amount);
            }
            // Deposits MATIC into the pool
            wethGateway.depositETH{ value: _amount }(address(lendingPool), address(this), 0);
        } else {
            _depositToken.approve(address(lendingPool), _amount);
            lendingPool.supply(address(_depositToken), _amount, _user, 0);
        }

        (,, uint256 availableBorrowsBase,,,) = lendingPool.getUserAccountData(_user);

        uint256 borrowAmount;

        if (address(aggregator) != address(0)) {
            uint256 safeBorrowAmount = mulDiv(availableBorrowsBase, 9500, 10_000);
            uint256 borrowAmount = mulDiv(safeBorrowAmount, 1, uint256(aggregator.latestAnswer()));
            borrowAmount = borrowAmount / _borrowToken.decimals();
        } else {
            borrowAmount = mulDiv(_amount, 5000, 10_000);
        }
        borrowAmount = borrowAmount / _borrowToken.decimals();
        lendingPool.borrow(address(_borrowToken), borrowAmount, 1, 0, _user);
    }

    function redeem(IERC20Metadata _token, uint256 _amount, address _user) external {
        if (msg.sender != oven) revert();
        // Withdraws funds (principal + interest + rewards) from external pool
        if (address(_token) == address(0) || address(_token) == address(weth)) {
            address aTokenAddress;
            if (address(_token) == address(0)) {
                (aTokenAddress,,) = dataProvider.getReserveTokensAddresses(address(weth));
            } else {
                (aTokenAddress,,) = dataProvider.getReserveTokensAddresses(address(_token));
            }

            IAToken(aTokenAddress).approve(address(wethGateway), _amount);

            wethGateway.withdrawETH(address(lendingPool), _amount, _user);
        } else {
            lendingPool.withdraw(address(_token), _amount, _user);
        }
    }
}
