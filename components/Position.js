import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { poolManagerAbi } from "../constants/poolManager";
import {
    Manager,
  } from "../constants/constants";
  import { poolAbi } from "../constants/pool";
import { getEllipsisTxt } from '../utils';

const Position = ({tokenId}) => {

    const [liquidityInfo,setLiquidityInfo]=useState()
    const [pool,setPool]=useState()
    const [token0,setToken0]=useState()
    const [token1,setToken1]=useState()

    const {
        active,
        activate,
        chainId,
        account,
        library: provider,
      } = useWeb3React();
      useEffect(() => {
        if(active){
            getLiquidityInfo()
        }
      }, [active])
      useEffect(() => {
        if(pool){
            getTokens()
        }
      }, [pool])
      

    async function getLiquidityInfo(){
        if (active) {
          const signer = provider.getSigner();
          const poolManagerInst = new ethers.Contract(
            Manager,
            poolManagerAbi,
            signer
          );
          setLiquidityInfo(await poolManagerInst.positions(tokenId))
          setPool((await poolManagerInst.positions(tokenId)).pool)
        }
      }
      async function getTokens() {
        if (active) {
          const signer = provider.getSigner();
          const poolInst = new ethers.Contract(pool, poolAbi, signer);
          const data=await poolInst.getImmutables()
          const _token0 = data._token0;
          const _token1 = data._token1;
          setToken0(_token0)
          setToken1(_token1)
          try {
            
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("Please install MetaMask");
        }
      }  
      async function burn(){
        if (active) {
          const signer = provider.getSigner();
          const poolManagerInst = new ethers.Contract(
            Manager,
            poolManagerAbi,
            signer
          );
    
          const liquidityAmount=(await poolManagerInst.positions(tokenId)).liquidity
          console.log(await poolManagerInst.positions(tokenId))
          await poolManagerInst.burn(tokenId, liquidityAmount, account, true, 0, 0)
        }
      }
      async function collectFee(){
        if (active) {
          const signer = provider.getSigner();
          const poolManagerInst = new ethers.Contract(
            Manager,
            poolManagerAbi,
            signer
          );
    
          await poolManagerInst.collect(tokenId, account, true)
        }
      }
  return (
    <div className="border  border-white p-1">
        <p>
        {tokenId}
        </p>
        <p>
        Token0:{getEllipsisTxt(token0)}
        </p>
        <p>
        Token1:{getEllipsisTxt(token1)}
        </p>
        <button onClick={()=>burn()} className='w-full bg-white text-black p-1'>
Remove
        </button>
        <button onClick={()=>collectFee()} className='w-full bg-white text-black p-1'>
Collect Fee
        </button>
    </div>  )
}

export default Position