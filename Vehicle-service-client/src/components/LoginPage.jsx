import React from 'react'
import UserLoginPage from './UserLoginPage'
import MechanicLoginPage from './MechanicLoginPage'
const LoginPage = () => {
  return (
    <div className='flex justify-center space-x-8'>
        <UserLoginPage/>
        <MechanicLoginPage/>

    </div>
 
  )
}

export default LoginPage