import React, { useState,useEffect } from 'react'
import { auth } from '../../firebase'
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux'
const Register = ({history}) => {
    const [email,setEmail] =useState('')

    const { user } = useSelector((state)=> ({...state}));

    useEffect(()=>{
        if(user && user.token) history.push('/')
    },[user]);

    const handleSubmit = async (e) =>{
        console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
        e.preventDefault()
        const config = {
            url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp:true,
        }
        await auth.sendSignInLinkToEmail(email,config)
     
        toast.success(`Email is sent to ${email} .Click the link to complete registration`);
    
    // save user email in local storage

        window.localStorage.setItem('emailForRegistration',email)

        // clear the state
        setEmail('')
    };



    const handleChange=(e)=>{
        setEmail(e.target.value)
    }
    const registerForm = ()=>{
        return(
           <form onSubmit={handleSubmit}>
               <input type="email" className="form-control" value={email} onChange={handleChange}
               autoFocus placeholder='Enter your email'
               />
               <button type='submit' className='btn btn-secondary mt-2'>Register</button>
           </form>
        )
    }
  return (
    <div className='container p-5' >
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <h4>Register</h4>
             
               {registerForm()}
            </div>
        </div>
    </div>
  )
}

export default Register