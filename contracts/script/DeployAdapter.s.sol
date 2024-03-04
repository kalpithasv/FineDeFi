
pragma solidity ^0.8.22;

import "../adapters/AaveAdapter.sol";
import "forge-std/Script.sol";

contract DeployAdapter is Script {
    AaveAdapter _aaveAdapter;
    address oven = 0x5A5B14594f1BF93656a2B705ECdb873373A4eFe9;
    IPoolAddressProvider addressProvider = IPoolAddressProvider(0x4CeDCB57Af02293231BAA9D39354D6BFDFD251e0);
    IWETHGateway wethGateway = IWETHGateway(0x8dA9412AbB78db20d0B496573D9066C474eA21B8);
    IDataProvider _dataProvider = IDataProvider(0x9e2DDb6aA91399546Bd875E2e63E8d6df276922e);
    IWETH _weth = IWETH(0xc199807AF4fEDB02EE567Ed0FeB814A077de4802);
    IAggregator _aggregator = IAggregator(address(0));

    function run() external {
        vm.startBroadcast();

        _aaveAdapter = new AaveAdapter(oven, addressProvider, wethGateway, _dataProvider, _weth, _aggregator);
        console.log(address(_aaveAdapter));
    }
}  