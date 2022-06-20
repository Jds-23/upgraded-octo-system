module.exports={
    poolAbi: [
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_deployData",
              "type": "bytes"
            },
            {
              "internalType": "contract IMasterDeployer",
              "name": "_masterDeployer",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "InvalidSwapFee",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "InvalidTick",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "InvalidToken",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "LiquidityOverflow",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Locked",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "LowerEven",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "MaxTickLiquidity",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "OnlyOwner",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Overflow",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "PriceOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TickOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Token0Missing",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Token1Missing",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "UpperOdd",
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
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount0",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount1",
              "type": "uint256"
            }
          ],
          "name": "Burn",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount0",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount1",
              "type": "uint256"
            }
          ],
          "name": "Collect",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount0",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount1",
              "type": "uint256"
            }
          ],
          "name": "Mint",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "tokenIn",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "tokenOut",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
            }
          ],
          "name": "Swap",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "newSwapFee",
              "type": "uint256"
            }
          ],
          "name": "SwapFeeUpdated",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "barFee",
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
              "internalType": "int24",
              "name": "lower",
              "type": "int24"
            },
            {
              "internalType": "int24",
              "name": "upper",
              "type": "int24"
            },
            {
              "internalType": "uint128",
              "name": "amount",
              "type": "uint128"
            }
          ],
          "name": "burn",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "token0Amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "token1Amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "token0Fees",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "token1Fees",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "int24",
              "name": "tick",
              "type": "int24"
            },
            {
              "internalType": "bool",
              "name": "zeroForOne",
              "type": "bool"
            }
          ],
          "name": "cancelLimitOrder",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "int24",
              "name": "tick",
              "type": "int24"
            },
            {
              "internalType": "bool",
              "name": "zeroForOne",
              "type": "bool"
            }
          ],
          "name": "claimLimitOrder",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "int24",
              "name": "lower",
              "type": "int24"
            },
            {
              "internalType": "int24",
              "name": "upper",
              "type": "int24"
            }
          ],
          "name": "collect",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amount0fees",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount1fees",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "collectProtocolFee",
          "outputs": [
            {
              "internalType": "uint128",
              "name": "amount0",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "amount1",
              "type": "uint128"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "int24",
              "name": "tick",
              "type": "int24"
            },
            {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "native",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "zeroForOne",
              "type": "bool"
            }
          ],
          "name": "createLimitOrder",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "feeGrowthGlobal0",
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
          "name": "feeGrowthGlobal1",
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
          "name": "getAssets",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "assets",
              "type": "address[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getImmutables",
          "outputs": [
            {
              "internalType": "uint128",
              "name": "_MAX_TICK_LIQUIDITY",
              "type": "uint128"
            },
            {
              "internalType": "uint24",
              "name": "_tickSpacing",
              "type": "uint24"
            },
            {
              "internalType": "uint24",
              "name": "_swapFee",
              "type": "uint24"
            },
            {
              "internalType": "address",
              "name": "_barFeeTo",
              "type": "address"
            },
            {
              "internalType": "contract IVaultMinimal",
              "name": "_vault",
              "type": "address"
            },
            {
              "internalType": "contract IMasterDeployer",
              "name": "_masterDeployer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_token0",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_token1",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getPriceAndNearestTicks",
          "outputs": [
            {
              "internalType": "uint160",
              "name": "_price",
              "type": "uint160"
            },
            {
              "internalType": "int24",
              "name": "_nearestTick",
              "type": "int24"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getReserves",
          "outputs": [
            {
              "internalType": "uint128",
              "name": "_reserve0",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "_reserve1",
              "type": "uint128"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getSecondsGrowthAndLastObservation",
          "outputs": [
            {
              "internalType": "uint160",
              "name": "_secondsGrowthGlobal",
              "type": "uint160"
            },
            {
              "internalType": "uint32",
              "name": "_lastObservation",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTokenProtocolFees",
          "outputs": [
            {
              "internalType": "uint128",
              "name": "_token0ProtocolFee",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "_token1ProtocolFee",
              "type": "uint128"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "int24",
              "name": "",
              "type": "int24"
            }
          ],
          "name": "limitOrderTicks",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "token0Liquidity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "token1Liquidity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "token0Claimable",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "token1Claimable",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "liquidity",
          "outputs": [
            {
              "internalType": "uint128",
              "name": "",
              "type": "uint128"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "int24",
                  "name": "lowerOld",
                  "type": "int24"
                },
                {
                  "internalType": "int24",
                  "name": "lower",
                  "type": "int24"
                },
                {
                  "internalType": "int24",
                  "name": "upperOld",
                  "type": "int24"
                },
                {
                  "internalType": "int24",
                  "name": "upper",
                  "type": "int24"
                },
                {
                  "internalType": "uint128",
                  "name": "amount0Desired",
                  "type": "uint128"
                },
                {
                  "internalType": "uint128",
                  "name": "amount1Desired",
                  "type": "uint128"
                },
                {
                  "internalType": "bool",
                  "name": "native",
                  "type": "bool"
                }
              ],
              "internalType": "struct IConcentratedLiquidityPoolStruct.MintParams",
              "name": "mintParams",
              "type": "tuple"
            }
          ],
          "name": "mint",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "liquidityMinted",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "nearestTick",
          "outputs": [
            {
              "internalType": "int24",
              "name": "",
              "type": "int24"
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
              "internalType": "int24",
              "name": "",
              "type": "int24"
            },
            {
              "internalType": "int24",
              "name": "",
              "type": "int24"
            }
          ],
          "name": "positions",
          "outputs": [
            {
              "internalType": "uint128",
              "name": "liquidity",
              "type": "uint128"
            },
            {
              "internalType": "uint256",
              "name": "feeGrowthInside0Last",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "feeGrowthInside1Last",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "int24",
              "name": "lowerTick",
              "type": "int24"
            },
            {
              "internalType": "int24",
              "name": "upperTick",
              "type": "int24"
            }
          ],
          "name": "rangeFeeGrowth",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "feeGrowthInside0",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "feeGrowthInside1",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint160",
              "name": "_price",
              "type": "uint160"
            }
          ],
          "name": "setPrice",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "swap",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tickCount",
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
              "internalType": "int24",
              "name": "",
              "type": "int24"
            }
          ],
          "name": "ticks",
          "outputs": [
            {
              "internalType": "int24",
              "name": "previousTick",
              "type": "int24"
            },
            {
              "internalType": "int24",
              "name": "nextTick",
              "type": "int24"
            },
            {
              "internalType": "uint128",
              "name": "liquidity",
              "type": "uint128"
            },
            {
              "internalType": "uint256",
              "name": "feeGrowthOutside0",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "feeGrowthOutside1",
              "type": "uint256"
            },
            {
              "internalType": "uint160",
              "name": "secondsGrowthOutside",
              "type": "uint160"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "updateBarFee",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint24",
              "name": "_swapFee",
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