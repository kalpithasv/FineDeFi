const CONTRACT_ADDRESS = '0x17910372dFfca2332391Ce04Bccc0f3e7959330F';

const CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_interestRate",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "loanAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "repaymentDueDate",
                "type": "uint256"
            }
        ],
        "name": "LoanCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "loanAmount",
                "type": "uint256"
            }
        ],
        "name": "LoanDefaulted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "loanAmount",
                "type": "uint256"
            }
        ],
        "name": "LoanRepaid",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "collateralAsset",
        "outputs": [
            {
                "internalType": "contract IERC721",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "collateralToken",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_loanAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_collateralAssetId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_repaymentDueDate",
                "type": "uint256"
            }
        ],
        "name": "createLoan",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            }
        ],
        "name": "declareDefault",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "collateralTokenId",
                "type": "uint256"
            }
        ],
        "name": "getAllowedCredit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            }
        ],
        "name": "getCollateralLensId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            }
        ],
        "name": "getLoanAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            }
        ],
        "name": "getLoanStatus",
        "outputs": [
            {
                "internalType": "enum LoanContract.LoanStatus",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "interestRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "loanCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "loans",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "loanAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "collateralAssetId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "repaymentDueDate",
                "type": "uint256"
            },
            {
                "internalType": "enum LoanContract.LoanStatus",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "onERC1155BatchReceived",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "",
                "type": "bytes4"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "onERC1155Received",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "",
                "type": "bytes4"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "collateralLensId",
                "type": "uint256"
            }
        ],
        "name": "redeemCollat",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "repayLoan",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            }
        ],
        "name": "simulateInterests",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const CONTRACT_ABI_2 = [
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "sendEther",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    },
    {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const Tokens = [
    {
        name: 'Uniswap (UNI)',
        val: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d'
    },
    {
        name: 'Aave (AAVE)',
        val: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d'
    },
    {
        name: 'Compound (COMP)',
        val: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    },
    {
        name: 'Chainlink (LINK)',
        val: '0x514910771af9ca656af840dff83e8264ecf986ca'
    },
    {
        name: 'Maker (MKR)',
        val: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d'
    },
    {
        name: 'OMG Network (OMG)',
        val: '0x6b175474e89094c44da98b954eedeac495271d0f'
    },
    {
        name: 'Wrapped Bitcoin (WBTC)',
        val: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
    },
    {
        name: 'Wrapped Matic (WMatic)',
        val: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
    },
    {
        name: 'ETH',
        val: '0x2a2CcD157C4Ed8485CF9385fd9460117cE717bBB'
    }
];

const chains = [
    {
        name: 'Ethereum (ETH)',
        val: '0x1'
    },
    {
        name: 'Binance Smart Chain (BNB)',
        val: '0x38'
    },
    {
        name: 'Polygon (MATIC)',
        val: '0x89'
    },
    {
        name: 'Avalanche (AVAX)',
        val: '0xa86a'
    },
];

export { CONTRACT_ADDRESS, CONTRACT_ABI, Tokens, chains, CONTRACT_ABI_2 }