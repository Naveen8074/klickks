import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Login = () => {

    const navigate = useNavigate()

    const [email, setLoginEmail] = useState('')
    const [password, setLoginPass] = useState('')
    const [err, setErr] = useState('')


    
    const loginForm = async event => {

        event.preventDefault()
        try{
            const res =await axios.post('http://localhost:5000/login',{
                email, 
                password
            }, {withCredentials: true});
            if(res.data.error){
                console.log('Login failed:', res.data.error)
                setErr(res.data.error)
            }
            else{
                console.log("Login successful ", res.data)
            navigate('/dashboard')
            }
        }
        catch(error){
            console.log('Login error: ', error)
        }
    }

 



  return (
    <div className='login-main-container'>
        <h1 className='login-heading'>Login into your account</h1>
        <form onSubmit={loginForm} className='login-form-container'>
            <label className='login-label' htmlFor='loginemail'>
                Enter your email :
            </label>
            <input type='email' className='login-index' id='loginemail' 
            placeholder='Enter mail id' onChange={e => setLoginEmail(e.target.value) } />

            <label className='login-label' htmlFor='loginPass'>
                Enter your password :
            </label>
            <input type='password' className='login-index' id='loginPass' placeholder='Enter password id'
             onChange={e => setLoginPass(e.target.value)} />

            <button className='login-button'>Login</button>
            {err && <p style={{color: 'red'}}>{err}</p>}
        </form>
    </div>
  )
}

export default Login