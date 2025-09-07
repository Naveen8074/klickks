import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate()


  const onLogout = () => {
    try{
      axios.post('http://localhost:5000/logout', {}, {withCredentials: true});
      navigate('/')
    }
    catch(err){
      console.log('Logout error: ',err)
    }
  }

  return (
    <div>
      <h1 style={{color: 'white'}}>Welcome to Dashboard</h1>
      <button className='register-button' onClick={onLogout} >Logout</button>
    </div>
  )
}

export default Dashboard