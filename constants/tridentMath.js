module.exports={
    tridentMathUIAbi: [
      {
        "inputs": [
          {
            "internalType": "uint160",
            "name": "_tickZeroPrice",
            "type": "uint160"
          },
          {
            "internalType": "uint160",
            "name": "_sqrtPrice",
            "type": "uint160"
          }
        ],
        "name": "priceFromSqrtprice",
        "outputs": [
          {
            "internalType": "uint160",
            "name": "price",
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
            "name": "_tickZeroPrice",
            "type": "uint160"
          },
          {
            "internalType": "uint160",
            "name": "price",
            "type": "uint160"
          }
        ],
        "name": "sqrtPriceFromPrice",
        "outputs": [
          {
            "internalType": "uint160",
            "name": "sqrtRatioX96",
            "type": "uint160"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      }
    ],
}