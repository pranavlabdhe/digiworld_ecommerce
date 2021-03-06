import React, { useState,useEffect } from 'react'
import { auth, googleAuthProvider } from '../../firebase'
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux';
import { async } from '@firebase/util';
import { Link } from 'react-router-dom';

const ForgetPassword = ({history}) =>{
    const [email,setEmail] = useState('')
    const [loading,setLoading] = useState(false)

    const { user } = useSelector((state)=> ({...state}));

    useEffect(()=>{
        if(user && user.token) history.push('/')
    },[user]);
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true)
        const config = {
            url:process.env.REACT_APP_FORGET_PASSWORD_REDIRECT_URL,
            handleCodeInApp:true,
        }
        await auth.sendPasswordResetEmail(email,config)
        .then(()=>{
            toast.success(`Password Reset Link send to ${email}`)
            setEmail('');
            setLoading(false)
        }).catch((error)=>{
            setLoading(false)
            toast.error(error.message)
            console.log('in forgot passwd',error);
        })

    }
    return (<div className='container col-md-6 offset-md-3 p-5'>
        {loading ? (<h4 className='text-danger'>Loading...</h4>):(<h4>Login</h4>)}

        <form onSubmit={handleSubmit}>
            <input type="email" className='form-control' 
            value={email} onChange={(e)=>setEmail(e.target.value)} 
            placeholder="Enter your email"
            autoFocus
            />
            <br></br>
            <button className='btn btn-primary' disabled={!email}>Submit</button>
        </form>
    </div>
    )
}
export default ForgetPassword

