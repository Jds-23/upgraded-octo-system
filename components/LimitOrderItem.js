import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { poolManagerAbi } from "../constants/poolManager";
import {
    Manager,
  } from "../constants/constants";
  import { poolAbi } from "../constants/pool";
import { getEllipsisTxt } from '../utils';
import { formatEther, parseEther } from 'ethers/lib/utils';

const LimirOrderItem = ({tokenId}) => {

    const [limitOrderData,setLimitOrderData]=useState()
    const [limitOrderTickData,setLimitOrderTickData]=useState()
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
            getLimitOrderInfo()
        }
      }, [active])
      useEffect(() => {
        if(pool){
            getTokens()
        }
      }, [pool])
      useEffect(() => {
        if(pool&&limitOrderData){
            getLimitOrderTickData()
        }
      }, [pool,limitOrderData])
      

    async function getLimitOrderInfo(){
        if (active) {
         try {const signer = provider.getSigner();
          const poolManagerInst = new ethers.Contract(
            Manager,
            poolManagerAbi,
            signer
          );

          setLimitOrderData(await poolManagerInst.limitOrders(tokenId))
          console.log(await poolManagerInst.limitOrders(tokenId))
        //   setLiquidityInfo(await poolManagerInst.positions(tokenId))
          setPool((await poolManagerInst.limitOrders(tokenId)).pool)}catch(err){
            console.log(err)
          }
        }
      }

      async function getLimitOrderTickData(){
        if (active) {
            const tick=limitOrderData.tick;
            const signer = provider.getSigner();
            const poolInst = new ethers.Contract(pool, poolAbi, signer);
            const limitOrderTickData = await poolInst.limitOrderTicks(tick);
            const claimableAmount = limitOrderTickData.token0Claimable;
            setLimitOrderTickData(limitOrderTickData)
            console.log(limitOrderTickData)
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
      async function claim(){
        if (active&&limitOrderTickData) {
          const signer = provider.getSigner();
          const poolManagerInst = new ethers.Contract(
            Manager,
            poolManagerAbi,
            signer
          );
          let claimParams
        if(limitOrderData.zeroForOne)
           claimParams = {
            pool,
            tokenId,
            amountToClaim: limitOrderTickData.token1Claimable,
            unwrapClaim:true,
            recipient: account,
          };
        else 
          claimParams = {
           pool,
           tokenId,
           amountToClaim: limitOrderTickData.token0Claimable,
           unwrapClaim:true,
           recipient: account,
         };
    
          await poolManagerInst.claimLimitOrder(tokenId, claimParams.amountToClaim, true)
        }
    }
    async function cancel(){
        if(active){
            const signer = provider.getSigner();
            const poolManagerInst = new ethers.Contract(
                Manager,
                poolManagerAbi,
                signer
                );
            await poolManagerInst.cancelLimitOrder(tokenId,  true)
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
        {limitOrderData&&<p>
        ZeroForOne:{limitOrderData?.zeroForOne}
        </p>}
        <button onClick={()=>cancel()}  className='w-full bg-white text-black p-1'>
Remove
        </button>
        {
            limitOrderData&&limitOrderTickData&&<>
            {
                limitOrderData?.zeroForOne?
        <button onClick={()=>claim()} className='w-full bg-white text-black p-1'>
Claim {
    formatEther(limitOrderTickData?.token1Claimable?.toString())
}
        </button>
                :
        <button onClick={()=>claim()} className='w-full bg-white text-black p-1'>
Claim {
    formatEther(limitOrderTickData?.token0Claimable?.toString())
}
        </button>

            }
            </>
        }
    </div>  )
}

export default LimirOrderItem