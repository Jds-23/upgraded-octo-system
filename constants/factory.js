module.exports={
    factoryAbi: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_masterDeployer",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_limitOrderManager",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_deployer",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "InvalidTokenOrder",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "UnauthorisedDeployer",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "WrongTokenOrder",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "ZeroAddress",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "configAddress",
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
            "internalType": "bytes",
            "name": "_deployData",
            "type": "bytes"
          }
        ],
        "name": "deployPool",
        "outputs": [
          {
            "internalType": "address",
            "name": "pool",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "deployer",
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
            "internalType": "address",
            "name": "token0",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "token1",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "startIndex",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "count",
            "type": "uint256"
          }
        ],
        "name": "getPools",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "pairPools",
            "type": "address[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "limitOrderManager",
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
        "inputs": [],
        "name": "masterDeployer",
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
          }
        ],
        "name": "pools",
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
            "internalType": "address",
            "name": "token0",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "token1",
            "type": "address"
          }
        ],
        "name": "poolsCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "count",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_deployer",
            "type": "address"
          }
        ],
        "name": "setDeployer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "pool",
            "type": "address"
          },
          {
            "internalType": "uint24",
            "name": "limitOrderFee",
            "type": "uint24"
          }
        ],
        "name": "updateLimitOrderFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "pool",
            "type": "address"
          },
          {
            "internalType": "uint24",
            "name": "swapFee",
            "type": "uint24"
          }
        ],
        "name": "updateSwapFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
}