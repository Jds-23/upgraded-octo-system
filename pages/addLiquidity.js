import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
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
  PoolManager,
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
  findLowerValidTick,
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
import useDeepCompareEffect from "use-deep-compare-effect";


export const injected = new InjectedConnector();

const settings = {
  apiKey: 'bdQwGGu60mgCFQ2oT-KlMLJfEKjiChzi', // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.
};
const alchemy = new Alchemy(settings);


export default function Addliquidity() {
  //States
  const [hasMetamask, setHasMetamask] = useState(false);
  const [lowerPrice, setLowerPrice] = useState("");
  const [upperPrice, setUpperPrice] = useState("");

  const [token0, setToken0] = useState(
    "0xb56b6549E17D681BC46203972f49A4f72d1bF22B"
  );
  const [token1, setToken1] = useState(
    "0xc7B8Da9185bBE76907711F34E1D9d12e978da93d"
  );
  const [pool, setPool] = useState("");
  const [currentprice, setCurrentPrice] = useState("");
  const [nearestTick, setNearestTick] = useState("");
  const [tokenId, setTokenId] = useState("0");
  const [token0Amount, setToken0Amount] = useState("");
  const [token1Amount, setToken1Amount] = useState("");
  const [lowerTick, setLowerTick] = useState("");
  const [upperTick, setUpperTick] = useState("");
  const [upperOldTick, setUpperOldTick] = useState("");
  const [lowerOldTick, setLowerOldTick] = useState("");

  const [liquidityPositions,setLiquidityPositions]=useState([])

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });
  const [addLiquidityBtnStatus, setAddLiquidityBtnStatus] = useState(undefined);

  const {
    active,
    activate,
    chainId,
    account,
    library: provider,
  } = useWeb3React();
  useEffect(() => {
    if (!active) {
      setAddLiquidityBtnStatus("Connect Wallet");
      return;
    } else if (token0 === "") {
      setAddLiquidityBtnStatus("Enter Token0");
      return;
    } else if (token0 === "") {
      setAddLiquidityBtnStatus("Enter Token1");
      return;
    } else if (pool === "") {
      setAddLiquidityBtnStatus("No Active Pool Found");
      return;
    } else if (currentprice === "") {
      setAddLiquidityBtnStatus("Current price not Found");
      return;
    } else if (lowerPrice === "") {
      setAddLiquidityBtnStatus("Enter lower price");
      return;
    } else if (upperPrice === "") {
      setAddLiquidityBtnStatus("Enter upper price ");
      return;
    } else if (token0Amount === "") {
      setAddLiquidityBtnStatus("Enter Amount of TokenA");
      return;
    } else if (token1Amount === "") {
      setAddLiquidityBtnStatus("Enter Amount of TokenB ");
      return;
    } else {
      setAddLiquidityBtnStatus(undefined);
    }
  }, [
    pool,
    token0,
    token1,
    currentprice,
    lowerPrice,
    upperPrice,
    token0Amount,
    token1Amount,
  ]);

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
        const poolNearestTick = (await poolInst.getPriceAndNearestTicks())._nearestTick;
        console.log(poolCurrentprice.toString());
        const currentprice = await tridentMathInst.priceFromSqrtprice(
          twoX192.toString(),
          poolCurrentprice.toString()
        );
        console.log(currentprice.toString());
        setCurrentPrice(currentprice.toString());
        setNearestTick(poolNearestTick)
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }  

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

  async function approveTokens() {
    if (active) {
      // debugger
      const signer = provider.getSigner();
      const accountAddress = await signer.getAddress();
      console.log("signer", accountAddress);
      const poolInst = new ethers.Contract(pool, poolAbi, signer);
      // const{ _MAX_TICK_LIQUIDITY,
      //   _tickSpacing,
      //   _swapFee,
      //   _barFeeTo,
      //   _vault,
      //   _masterDeployer,
      //   _token0,
      //   _token1}=await poolInst.getImmutables()
      const _token0 = (await poolInst.getImmutables())._token0;
      const _token1 = (await poolInst.getImmutables())._token1;
      const tokenAInst = new ethers.Contract(_token0, erc20TokenAbi, signer);
      const tokenBInst = new ethers.Contract(_token1, erc20TokenAbi, signer);
      const vaultInst = new ethers.Contract(Vault, vaultAbi, signer);
      // debugger
      try {
      let tx=  await tokenAInst.approve(Vault, getBigNumber(token0Amount));
      await tx.wait()
      tx=  await tokenBInst.approve(Vault, getBigNumber(token1Amount));
      await tx.wait()
      tx=  await vaultInst.setMasterContractApproval(
        accountAddress,
        PoolManager,
        true,
        "0",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        await tx.wait()
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  async function main() {
    if (active) {
      const signer = provider.getSigner();
      const poolManagerInst = new ethers.Contract(
        PoolManager,
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
      const tickMathInst = new ethers.Contract(TickMath, tickMathAbi, signer);
      const tridentMathInst = new ethers.Contract(
        TridentMath,
        tridentMathUIAbi,
        signer
      );
      try {
        const twoX192 = BigNumber.from(2).pow(96);
        // Fetching current Pool Price
        // const poolCurrentprice = await poolInst.price();
        // const tickAtPrice = await tickMathInst.getTickAtSqrtRatio(
        //   poolCurrentprice
        // );
        // const currentprice = await tridentMathInst.priceFromSqrtprice(
        //   twoX192.toString(),
        //   poolCurrentprice.toString()
        // );
        setAddLiquidityBtnStatus("Searching for nearest valid price range");
        //Lower Price calculation
        //convert price to fraction
        const lowerPriceFraction = new Fraction(lowerPrice);
        const desiredLowerSqrtX96Price = encodeSqrtRatioX96(
          lowerPriceFraction.numerator,
          lowerPriceFraction.denominator
        );

        const desiredLowerTick = await tickMathInst.getTickAtSqrtRatio(
          desiredLowerSqrtX96Price.toString()
        );

        let lowerValidTick = await findLowerValidTick(
          desiredLowerTick,
          _tickSpacing
        );
        if(parseFloat(lowerValidTick)>parseFloat(nearestTick)){
          let found=false
let validTick;
          for(let i=1;!found;i++){
            validTick=lowerValidTick-(i*_tickSpacing)
           
            if(Math.trunc(validTick /(_tickSpacing)) % 2 == 0){
              found=true;
            }
          }
      lowerValidTick=validTick
        }

        let lowerValidSqrtPrice = await tickMathInst.getSqrtRatioAtTick(
          lowerValidTick.toString()
        );

        const finallowerPrice = await tridentMathInst.priceFromSqrtprice(
          twoX192,
          lowerValidSqrtPrice.toString()
        );
        const actualLowerPriceInDecimals = finallowerPrice / 10 ** 6;
        // Upper Tick Calculation
        //convert price to fraction
        const upperPriceFraction = new Fraction(upperPrice);
        const desiredUpperSqrtX96Price = encodeSqrtRatioX96(
          upperPriceFraction.numerator,
          upperPriceFraction.denominator
        );

        const tickAtUpperPrice = await tickMathInst.getTickAtSqrtRatio(
          desiredUpperSqrtX96Price.toString()
        );

        let UpperValidTick = await findUpperValidTick(
          tickAtUpperPrice,
          _tickSpacing
        );

        if(parseFloat(UpperValidTick)<parseFloat(nearestTick)){
          UpperValidTick=nearestTick;
        }

        let UpperSqrtX96Valid = await tickMathInst.getSqrtRatioAtTick(
          UpperValidTick.toString()
        );

        const finalUpperPrice = await tridentMathInst.priceFromSqrtprice(
          twoX192.toString(),
          UpperSqrtX96Valid.toString()
        );
        const actualUpperPriceInDecimals = finalUpperPrice / 10 ** 6;

        const lowerTick = lowerValidTick;
        const upperTick = UpperValidTick;
        setLowerPrice(actualLowerPriceInDecimals);
        setUpperPrice(actualUpperPriceInDecimals);

        setAddLiquidityBtnStatus("finding for old ticks");

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
        //Including current ticks
        validTicks.push(lowerTick, upperTick);
        //Sorting in ascending Order
        validTicks.sort(function (a, b) {
          return a - b;
        });
        console.log("valiticks", validTicks);
        let lowerOld = oldTickFinder(validTicks, lowerTick);
        let upperOld = oldTickFinder(validTicks, upperTick);
        console.log("low1", lowerOld);
        console.log("low2", upperOld);
        const upperOldTick = upperOld;
        const lowerOldTick = lowerOld;
        setAddLiquidityBtnStatus("Approving Tokens");

        // approve tokens
        await approveTokens();
        setAddLiquidityBtnStatus("Adding Liquidity");

        // add liquidity
        const tick = await poolInst.nearestTick();
        const tokenXamount = getBigNumber(token0Amount.toString());
        const tokenYamount = getBigNumber(token1Amount.toString());

        console.log("pool", pool);
        console.log("nearestTick", tick);
        console.log("loweroldTick", lowerOldTick);
        console.log("LowerTick", lowerTick);
        console.log("UpperOldTick", upperOldTick);
        console.log("UpperTick", upperTick);
        console.log("tokenXamount", tokenXamount);
        console.log("tokenYamount", tokenYamount);
        console.log("tokenId", tokenId);

        await poolManagerInst.mint(
          pool,
          lowerOldTick,
          lowerTick,
          upperOldTick,
          upperTick,
          tokenXamount,
          tokenYamount,
          true,
          "0",
          tokenId
        );
        setAddLiquidityBtnStatus(undefined);
      } catch (error) {
        console.log(error);
        setAddLiquidityBtnStatus("Error");
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  async function burn(){
    if (active) {
      const signer = provider.getSigner();
      const poolManagerInst = new ethers.Contract(
        PoolManager,
        poolManagerAbi,
        signer
      );

      const liquidityAmount=(await poolManagerInst.positions(3)).liquidity
      console.log(await poolManagerInst.positions(3))
      await poolManagerInst.burn(3, liquidityAmount.div(2), account, true, 0, 0)
    }
  }
  async function collectFee(){
    if (active) {
      const signer = provider.getSigner();
      const poolManagerInst = new ethers.Contract(
        PoolManager,
        poolManagerAbi,
        signer
      );

      await poolManagerInst.collect(2, account, true)
    }
  }

  

  return (
    <div>
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
      <div className="container">
        <h1>AddLiquidity</h1>
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
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Pool
                </label>
                <input
                  className="form-control"
                  onChange={(event) => setPool(event.target.value)}
                  type="text"
                  value={pool}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  tokenId
                </label>
                <input
                  className="form-control"
                  onChange={(event) => setTokenId(event.target.value)}
                  type="text"
                  value={tokenId}
                />
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
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Upper price
                </label>
                <input
                  className="form-control"
                  onChange={(event) => setUpperPrice(event.target.value)}
                  type="text"
                  value={upperPrice}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Lower Price
                </label>
                <input
                  className="form-control"
                  onChange={(event) => setLowerPrice(event.target.value)}
                  type="text"
                  value={lowerPrice}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Token A amount
                </label>
                <input
                  className="form-control"
                  onChange={(event) => setToken0Amount(event.target.value)}
                  type="text"
                  value={token0Amount}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Token B amount
                </label>
                <input
                  className="form-control"
                  onChange={(event) => setToken1Amount(event.target.value)}
                  type="text"
                  value={token1Amount}
                />
              </div>
              {active ? (
                 <button
                 type="button"
                 disabled={!!addLiquidityBtnStatus}
                 className="btn btn-primary btn-space"
                 onClick={() => main()}
               >
                 {addLiquidityBtnStatus
                   ? addLiquidityBtnStatus
                   : "Add Liquidity"}
               </button>
              ) : (
                ""
              )}
              
              {/* {active ? (
                <button
                  type="button"
                  className="btn btn-success btn-space"
                  onClick={() => approveTokens()}
                >
                  Approve
                </button>
              ) : (
                ""
              )}
              {active ? (
                <button
                  type="button"
                  className="btn btn-primary btn-space"
                  onClick={() => addliquidity()}
                >
                  Add Liquidity
                </button>
              ) : (
                ""
              )}
              {active ? (
                <button
                  type="button"
                  className="btn btn-primary btn-space"
                  onClick={() => getvalidPrice()}
                >
                  Find Valid price
                </button>
              ) : (
                ""
              )}
              {active ? (
                <button
                  type="button"
                  className="btn btn-primary btn-space"
                  onClick={() => findOldTicks()}
                >
                  Find Old Ticks
                </button>
              ) : (
                ""
              )}
              {active ? (
                <button
                  type="button"
                  className="btn btn-primary btn-space"
                  onClick={() => toGetParams()}
                >
                  toGetParams
                </button>
              ) : (
                ""
              )} */}
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
    </div>
  );
}
