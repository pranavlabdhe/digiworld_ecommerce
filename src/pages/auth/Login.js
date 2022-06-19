// O
import React, { useState,useEffect } from 'react'
import { auth, googleAuthProvider } from '../../firebase'
import {toast} from 'react-toastify'
import { Button } from 'antd';
import { MailOutlined,GoogleOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth';

//function to send valid user token to the backend 
//role based redirect



const Login = ({history}) => {
    const [email,setEmail] =useState('plabdhe2000@gmail.com')
    const [password,setPassword] =useState('')
    const [loading,setLoading] = useState(false)
    
    let dispatch = useDispatch()
  
    const { user } = useSelector((state)=> ({...state}));

  //   useEffect(()=>{

  //     let intended = history.location.state;
  //     if(intended){
  //       return;
  //     }else if(user && user.token ){
  //         history.push("/")
  //       }
  //     console.log('useEffect ran login');
  // },[user,history]);

  function roleBasedRedirect(res){

    // check if intended
    let intended = history.location.state
    if(intended){
       history.push(intended.from) 
    }else{
      if(res.data.role === 'admin'){
        history.push('/admin/products')
      }else if(res.data.role === 'subscriber') {
        history.push('/user/history');
      }
    }
}

    const handleSubmit = async (e) =>{
      e.preventDefault();
      setLoading(true)
      console.table(email,password)
      try {
        const results=await auth.signInWithEmailAndPassword(email,password);
        console.log(results);
        const { user } = results
        const idTokenResult = await user.getIdTokenResult()

        createOrUpdateUser(idTokenResult.token)//send the idTokenResult to the backend

        .then((res)=>{
          //getting all info from mongoDb and dispatching it.
          dispatch({
            type:"LOGGED_IN_USER",
            payload:{
              name:res.data.email.split('@')[0],
              email:res.data.email,
              token:idTokenResult.token,
              role:res.data.role,
              _id:res.data._id
            },
          });
          roleBasedRedirect(res)
        })
        .catch(err => console.log(err))
        
   
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        setLoading(true)
      }
    };

    const handleChangeEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handleChangePassword = (e)=>{
        setPassword(e.target.value)
    }
    const handleGoogleLogin = async ()=>{
      auth.signInWithPopup(googleAuthProvider)
      .then(async (res)=>{
        const {user} =res
        const idTokenResult = await user.getIdTokenResult()
        // console.log(res)
        createOrUpdateUser(idTokenResult.token)//send the idTokenResult to the backend

        .then((res)=>{
          //getting all info from mongoDb and dispatching it.
          console.log(res);
          dispatch({
            type:"LOGGED_IN_USER",
            payload:{
              name:res.data.name,
              email:res.data.email,
              token:idTokenResult.token,
              role:res.data.role,
              _id:res.data._id
            },
          });
          roleBasedRedirect(res)
        })
        .catch((err)=>console.log(err));
      })
      .catch((error)=>{
        console.log(error);
        toast.error(error.message)
      })
    }
    const loginForm = ()=>{
        return(
           <form onSubmit={handleSubmit} >
             <div className='form-group p-2'> 
             <input type="email" className="form-control" value={email} onChange={handleChangeEmail}
               autoFocus placeholder='Enter your email'
               />
          </div>
          <div className='form-group p-2'>
              <input type="password" className="form-control" value={password} onChange={handleChangePassword}
              placeholder='Enter your password'
              />
            </div>
        
            <Button type="primary" shape="round"  icon={<MailOutlined />}size='large' className="mb-3"
            block
            onClick={handleSubmit}
            disabled={!email || password.length < 6}>
            Login with Email and password
      </Button>
           </form>
        )
    }
  return (
    <div className='container p-5' >
      <p className='text-center'>plabdhe2000@gmail is the admin</p>
        <p className='text-center'>password-12345678</p>
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                {loading===false?(
                <h4>Login</h4>
                ):(
                <h4 className='text-danger'>Loading....</h4>
                )}
               {loginForm()}
               <Button type="danger" shape="round"  icon={<GoogleOutlined />}size='large' className="mb-3"
            block
            onClick={handleGoogleLogin}
            >
            Login with Email and password
          </Button>
          <Link to="/forgot/password" className='float-end text-secondary'>Forget password</Link>
            </div>
        </div>
    </div>
  )
}

export default Login