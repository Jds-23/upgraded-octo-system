import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { encodeSqrtRatioX96 } from "@uniswap/v3-sdk";
import { Fraction } from "fractional";
import { erc20TokenAbi } from "../constants/abis/contracts/mocks/ERC20Mock.sol/ERC20Mock";
import { Network, Alchemy } from 'alchemy-sdk';
import {
  MasterDeployer,
  factory,
  Vault,
  Manager,
  TickMath,
  TridentMath,
  PoolHelper,
} from "../constants/constants";
import { poolAbi } from "../constants/pool";
import { vaultAbi } from "../constants/vault";
import { poolHelperAbi } from "../constants/poolHelper";
import {
  getSqrtX96FromPrice,
  getSqrtX96FromPrice1,
  nearestValidTick,
  findUpperAndLower,
  findUpperValidTick,
  getpriceFromSqrtX96,
  getpriceFromSqrtX961,
  getBigNumber,
  oldTickFinder,
} from "../utils/tick";
import { tickMathAbi } from "../constants/tickmath";
import { poolManagerAbi } from "../constants/poolManager";
import { tridentMathUIAbi } from "../constants/tridentMath";
import { BigNumber, BigNumberish } from "ethers";
import { factoryAbi } from "../constants/factory";

export const injected = new InjectedConnector();

export default function Home() {
  const [hasMetamask, setHasMetamask] = useState(false);
  const [pool, setPool] = useState('');
  const [currentprice, setCurrentPrice] = useState("");

  const [price, setPrice] = useState('');
  const [zeroForOne, setZeroForOne] = useState(false);
  const [tokenAmount, setTokenAmount] = useState('');
  const [token0, setToken0] = useState(
    "0xb56b6549E17D681BC46203972f49A4f72d1bF22B"
  );
  const [token1, setToken1] = useState(
    "0xc7B8Da9185bBE76907711F34E1D9d12e978da93d"
  );

  const {
    active,
    activate,
    chainId,
    account,
    library: provider,
  } = useWeb3React();

  useEffect(() => {
    if (token0 !== "" && token1 !== "") {
      getPool();
    }
  }, [token0, token1,active]);
  useEffect(() => {
    if (pool !== "") {
      getPrice();
    }
  }, [pool]);
 
 
  async function getPool() {
    if (active) {
      const signer = provider.getSigner();
      const factoryContract = new ethers.Contract(factory, factoryAbi, signer);
      try {
        const pools = await factoryContract.pools(token0, token1, 0);
        setPool(pools);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
  async function getPrice() {
    if (active) {
      const signer = provider.getSigner();
      const poolInst = new ethers.Contract(pool, poolAbi, signer);
      const tridentMathInst = new ethers.Contract(
        TridentMath,
        tridentMathUIAbi,
        signer
      );
      const twoX192 = BigNumber.from(2).pow(96);

      try {
        const poolCurrentprice = (await poolInst.getPriceAndNearestTicks())._price;
        console.log(poolCurrentprice.toString());
        const currentprice = await tridentMathInst.priceFromSqrtprice(
          twoX192.toString(),
          poolCurrentprice.toString()
        );
        console.log(currentprice.toString());
        setCurrentPrice(currentprice.toString());
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }  

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await activate(injected);
        setHasMetamask(true);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function  main(){
    if(active){
      const signer = provider.getSigner();
      const twoX192 = BigNumber.from(2).pow(96);

      const tickMathInst = new ethers.Contract(TickMath, tickMathAbi, signer);

      const tridentMathInst = new ethers.Contract(
        TridentMath,
        tridentMathUIAbi,
        signer
      );
      const poolManagerInst = new ethers.Contract(
        Manager,
        poolManagerAbi,
        signer
      );
      const poolhelperInst = new ethers.Contract(
        PoolHelper,
        poolHelperAbi,
        signer
      );
      const poolInst = new ethers.Contract(pool, poolAbi, signer);
      const _tickSpacing = (await poolInst.getImmutables())._tickSpacing;


      const priceFraction = new Fraction(price);
      const desiredSqrtX96Price = encodeSqrtRatioX96(
        priceFraction.numerator,
        priceFraction.denominator
      );

      const desiredTick = await tickMathInst.getTickAtSqrtRatio(
        desiredSqrtX96Price.toString()
      );

      let validTick = await findUpperValidTick(
        desiredTick,
        _tickSpacing
      );

      let validSqrtPrice = await tickMathInst.getSqrtRatioAtTick(
        validTick.toString()
      );

      const finalPrice = await tridentMathInst.priceFromSqrtprice(
        twoX192,
        validSqrtPrice.toString()
      );
      const actualPriceInDecimals = finalPrice / 10 ** 6;
      setPrice(actualPriceInDecimals)

      const tokenamountInBigNumber = getBigNumber(tokenAmount.toString());
      // const validTicksData = await dfyn.concentratedPoolHelper.getTickState(pool.address, tickCount);
      // find old ticks
      const tickCount = await poolInst.tickCount();
      const validTicksData = await poolhelperInst.getTickState(
        pool,
        tickCount
      );
      const validTicks = [];
      validTicksData.map((tickData) => {
        validTicks.push(tickData.index);
      });
      // //Including current ticks
      const TickExists = validTicks.includes(validTick);
        if (!TickExists) {
          validTicks.push(validTick);
        }
      //Sorting in ascending Order
      validTicks.sort(function (a, b) {
        return a - b;
      });
      console.log("valiticks", validTicks);
      let lowerOld = findUpperAndLower( validTicks,validTick).lower;
      let upperOld = findUpperAndLower( validTicks,validTick).upper;

      if(zeroForOne){
       await approveToken0()
      } else{
       await approveToken1()
      }
console.log({pool,
  validTick,
  lowerOld,
  upperOld,
  tokenamountInBigNumber,
  zeroForOne})
      await poolManagerInst.createLimitOrder(
        pool,
        validTick,
        lowerOld,
        upperOld,
        true,
        tokenamountInBigNumber,
        zeroForOne
      );

    }
  }
  async function approveToken0() {
    if (active) {
      const signer = provider.getSigner();
      const accountAddress = await signer.getAddress();
      console.log("signer", accountAddress);
      const poolInst = new ethers.Contract(pool, poolAbi, signer);
      const _token0 = token0;

      const tokenAInst = new ethers.Contract(_token0, erc20TokenAbi, signer);
      const vaultInst = new ethers.Contract(Vault, vaultAbi, signer);
      try {
        let tx = await tokenAInst.approve(pool, getBigNumber(tokenAmount));
        await tx.wait();
        tx = await tokenAInst.approve(Vault, getBigNumber(tokenAmount));
        await tx.wait();

        tx = await vaultInst.setMasterContractApproval(
          accountAddress,
          Router,
          true,
          "0",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        await tx.wait();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

async function approveToken1() {
    if (active) {
      const signer = provider.getSigner();
      const accountAddress = await signer.getAddress();
      console.log("signer", accountAddress);
      const poolInst = new ethers.Contract(pool, poolAbi, signer);
      const _token1 = token1 ;

      const tokenBInst = new ethers.Contract(_token1, erc20TokenAbi, signer);
      const vaultInst = new ethers.Contract(Vault, vaultAbi, signer);
      try {
        let tx = await tokenBInst.approve(pool, getBigNumber(tokenAmount));
        await tx.wait();
        tx = await tokenBInst.approve(Vault, getBigNumber(tokenAmount));
        await tx.wait();

        tx = await vaultInst.setMasterContractApproval(
          accountAddress,
          Router,
          true,
          "0",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        await tx.wait();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
  return (
    <div className="container">
        {hasMetamask ? (
        active ? (
          chainId === 80001 ? (
            "Connected! "
          ) : (
            <button className="btn btn-danger float-end">
              Switch To Mumbai
            </button>
          )
        ) : (
          <button
            className="btn btn-danger float-end"
            onClick={() => connect()}
          >
            Connect
          </button>
        )
      ) : (
        "Please install metamask"
      )}
      <h1>Place Limit Order</h1>
        <div className="card">
          <div className="card-body">
            <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Token0
                </label>
                <input
                  className="form-control"
                  onChange={(event) => setToken0(event.target.value)}
                  type="text"
                  value={token0}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Token1
                </label>
                <input
                  className="form-control"
                  onChange={(event) => setToken1(event.target.value)}
                  type="text"
                  value={token1}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Pool</label>
                <input  className="form-control"
                readOnly
                type="text"
                value={pool} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Current price
                </label>
                <input
                  className="form-control"
                  type="text"
                  readOnly
                  value={
                    currentprice === ""
                      ? 0
                      : ethers.utils.formatUnits(currentprice, 6)
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">ZeroForOne</label>
                <input  
                onChange={event=>setZeroForOne(!zeroForOne)}
                type="checkbox"
                value={zeroForOne} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">price</label>
                <input  className="form-control"
                onChange={event=>setPrice(event.target.value)}
                type="text"
                value={price} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">TokenAmount</label>
                <input  className="form-control"
                onChange={event=>setTokenAmount(event.target.value)}
                type="text"
                value={tokenAmount} />
              </div>
              {/* {active ? <button type="button" className="btn btn-success btn-space" onClick={()=>approveTokens()}>Approve</button> : ""} */}
              {active ? <button type="button" className="btn btn-success btn-space" onClick={()=>main()}>Add Limit Order</button> : ""}
              {/* {active ? <button type="button" className="btn btn-primary btn-space" onClick={()=>addliquidity()}>Add Liquidity</button> : ""}
              {active ? <button type="button" className="btn btn-primary btn-space" onClick={()=>getvalidPrice()}>Find Valid price</button> : ""} */}
            </form>
          </div>
        </div>
      <h1>WorkFlow</h1>

      <h3>1.Click Connect</h3>
      <h3>2.Enter values</h3>
      <h3>3.Click Find valid Price</h3>
      <h3>4.Click Find Old Tick</h3>
      <h3>5.Click Approve</h3>
      <h3>6.Click AddLiquidity</h3>
      </div>
  );
}
