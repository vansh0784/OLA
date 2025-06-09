import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from "../assets/oladriver.png"

const DriverLogin = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[data,setData]=useState({})
  const HandlerFunction=(e)=>{
    e.preventDefault();
    setData({
      email:email,
      password:password,
    });

    setEmail('');
    setPassword('');
  }
  return (
    <div className="h-[90vh] w-full p-4 flex flex-col justify-between items-center bg-gray-50">
      <div className="w-full flex flex-col items-center">
        <img src={logo} className="h-20 mb-6" alt="Ola_Logo" />

        <form onSubmit={(e)=>HandlerFunction(e)} className="w-full max-w-sm bg-white p-6">
          <h1 className="text-lg font-semibold mb-2">What's your email</h1>
          <input
            required
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full px-3 py-2 mb-4 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black"
          />

          <h1 className="text-lg font-semibold mb-2">Enter Password</h1>
          <input
            required
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="password"
            className="w-full px-3 py-2 mb-6 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full mb-2 bg-black text-white text-lg font-semibold py-2 rounded hover:bg-gray-900 transition-all"
          >
            Login
          </button>

          <h1 className="text-center font-semibold text-gray-700">
            New here?{" "}
            <Link to="/signup-driver" className="text-blue-700">
                Register as a Driver
            </Link>
          </h1>
        </form>
      </div>
      <Link
        to="/login"
        className="w-11/12 max-w-sm mb-2 bg-[#818181] text-black text-lg font-semibold py-2 rounded text-center hover:bg-gray-700 transition-all"
      >
        Sign in as User
      </Link>

    </div>
  )
}

export default DriverLogin