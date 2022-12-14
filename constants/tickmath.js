module.exports={
    tickMathAbi: [
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
        "inputs": [
          {
            "internalType": "int24",
            "name": "tick",
            "type": "int24"
          }
        ],
        "name": "getSqrtRatioAtTick",
        "outputs": [
          {
            "internalType": "uint160",
            "name": "",
            "type": "uint160"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint160",
            "name": "sqrtPriceX96",
            "type": "uint160"
          }
        ],
        "name": "getTickAtSqrtRatio",
        "outputs": [
          {
            "internalType": "int24",
            "name": "",
            "type": "int24"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      }
    ]
}