import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './index.css'

const Register = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        name:'',
        email:'',
        password:''
    });

    const [err, setErr] = useState('')
    const [success, setsuccess] = useState('')

    const [storingUser, setStoredUser] = useState([])

    const onLoginOfRegister = () => {
        navigate('/login')
    }

    const formSubmission = async (event) => {
        event.preventDefault()
        setErr('')
        setsuccess('')
        
        const{ name,email,password }=user

        if( name && email && password ){
            try{ 
                const res = await axios.post('http://localhost:5000/register', {
                name, email, password
            })
            navigate('/login', {replace: true})
            setsuccess(res.data.message)
            }
            catch (error) {
                if(error.response && error.response.data && error.response.data.error){
                    setErr(error.response.data.error)
                }
                else{
                    setErr('Something went wrong')
                }

            }
        }
        else{
            setErr('All fields are required')
        }
    }

    

  return (
    <div className='register-main-container'>
        <h1>Register</h1>
        <form className='form-container' onSubmit={formSubmission}>
            <label htmlFor='name' className='label'>Enter your name: </label>
            <input id='name' value={user.name} className='input' type='text' placeholder='Enter your name' onChange={e => setUser(prev => ({...prev, name:e.target.value}))  } />
            <label htmlFor='email' className='label'>Enter your email : </label>
            <input id='email' value={user.email} className='input' type='email' placeholder='Enter your mail id' onChange={e => setUser(prev => ({...prev, email:e.target.value}))  } />
            <label htmlFor='password' className='label'>Password : </label>
            <input id='password' value={user.password} className='input' type='password' placeholder='Enter your password' onChange={e => setUser(prev => ({...prev, password:e.target.value}))  } />
            <div className='register-buttons-container'>
            <button className='register-button'>Register</button>
            <button className='register-button' onClick={onLoginOfRegister}>Login</button>
            </div>
        { err && <p style={{color: 'red'}}>{err}</p> }
        { success && <p style={{color: 'green'}}>{success}</p> }
        </form>
    </div>
  )
}

export default Register
