import React from 'react'
import { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
const LoadingToRedirect = () => {
    const [count,setCount] =useState(5)
    let history = useHistory()
    useEffect(()=>{
        const interval = setInterval(()=>{
            //
            setCount((currentCount)=> --currentCount)
        },1000);
        //redirect once count is 0
        count === 0 && history.push('/') 
        //cleanup
        return ()=>clearInterval(interval)
    },[count])
  return (
    <div className='conatiner p-5 text-center'>
       <h1>Redirecting in {count} seconds </h1>
        </div>
  )
}

export default LoadingToRedirect