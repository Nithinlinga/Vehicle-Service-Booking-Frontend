import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserLoginPage = () => {
  const navigate=useNavigate()
  const handleClick=(e)=>{
    e.preventDefault()
    navigate('/user-login')
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className=" text-white shadow-2xl rounded-xl p-10 w-96">
            <h2 className="text-2xl font-bold mb-1 text-center bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-indigo-400 ">For Users</h2>
            <p className=" mb-6 text-center mt-4 max-w-xl text-base text-slate-600 sm:text-lg dark:text-slate-300">Thousands of drivers have switched to a smarter 
              way to service their cars. Experience the difference.</p>
 
            <form className="flex flex-col space-y-4">
                <button type="submit" onClick={handleClick} className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                    Login
                </button><br /><br />
            </form>
            <p className="mt-6 text-center text-gray-400"> Don't have an account?{" "}
                <Link to="/user-register" className="text-green-400 hover:underline">Sign Up</Link>
            </p>
        </div>
    </div>
  )
}

export default UserLoginPage