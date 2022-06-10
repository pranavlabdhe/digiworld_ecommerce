import React from 'react'
import UserNav from '../../components/nav/UserNav'
import { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify' 




const Password = () => {
    const [password,setPassword] = useState("")
    const [loading,setLoading] =useState(false)
    const handleSubmit = async(e)  =>{
        e.preventDefault();
        setLoading(true)
        // console.log(password);
        await auth.currentUser.updatePassword(password)
        .then(()=>{
            toast.success('Password updated')
            setLoading(false)
            setPassword('')
            
        })
        .catch((err)=>{
            toast.error(err.message)
            setLoading(false)
       
            console.log(err);
        })
    }
    const passwordUpdateForm = () =>
    <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Your Password</label> <br></br> 
        <input type="password" onChange={e=>setPassword(e.target.value)} 
        className="form-control mt-2"
        placeholder='Enter new password'
        disabled={loading}
        value={password}
        /><br></br>
        <button className='btn btn-primary' disabled={!password || password.length < 6 || loading}>
            Submit
        </button>
        </div>
      
    </form>;
            
    
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'><UserNav/></div>
            <div className='col'>
                {loading ?(<h4 className='text-secondary'>Loading</h4>):
                (
                <h4>Update Password</h4>
                )}
                {passwordUpdateForm()}
            </div>
        </div>
    </div>
  )
}

export default Password