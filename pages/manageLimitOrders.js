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
  LimitOrderManager,
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
import { limitOrderManagerAbi } from "../constants/limitOrderManager";
import { tridentMathUIAbi } from "../constants/tridentMath";
import { BigNumber, BigNumberish } from "ethers";
import { factoryAbi } from "../constants/factory";
import useDeepCompareEffect from "use-deep-compare-effect";
import Position from "../components/Position";
import LimirOrderItem from "../components/LimitOrderItem";


export const injected = new InjectedConnector();

const settings = {
  apiKey: 'bdQwGGu60mgCFQ2oT-KlMLJfEKjiChzi', // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.
};
const alchemy = new Alchemy(settings);


export default function Addliquidity() {
  //States
  const [hasMetamask, setHasMetamask] = useState(false);
  

  const [limitOrders,setLimitOrders]=useState([])
  const [limitOrderContract,setLimitOrderContract]=useState("")

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  const {
    active,
    activate,
    chainId,
    account,
    library: provider,
  } = useWeb3React();
  

  useEffect(() => {
    if(active)
    getLimitOrderContract()
  }, [active]);
  useEffect(() => {
    if(active&&limitOrderContract!=="")
      getLiquidityNft()
  }, [active,limitOrderContract]);
 
  async function getLiquidityNft(){
    // alchemy.nft.getNftsForContract(Manager).then(res=>console.log(res))
    alchemy.nft.getNftsForOwner(account,{
      contractAddresses:[limitOrderContract]
    }).then(res=>setLimitOrders(res.ownedNfts))
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

  async function getLimitOrderContract() {
    if (active) {
      const signer = provider.getSigner();
      const limitOrderManagerInst = new ethers.Contract(
        LimitOrderManager,
        limitOrderManagerAbi,
        signer
      );      const limitOrderToken=await limitOrderManagerInst.limitOrderToken();
      try {
        setLimitOrderContract(limitOrderToken);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
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
        <h1>Manage Liquidity</h1>
        <div className="grid gap-3 grid-cols-4">

       {
        limitOrders.map(limitOrder=>(
            <LimirOrderItem tokenId={limitOrder.tokenId}  key={limitOrder.tokenId}/>
        ))
       }
               </div>

        
      </div>
    </div>
  );
}
