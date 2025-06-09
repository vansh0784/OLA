import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import logo from "../assets/olalogo.png";
import { useContext } from "react";
import {UserDataContext} from "../context/UserContext";
const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [user,setUser]=React.useContext(UserDataContext);
  const navigate=useNavigate();
  const HandlerFunction =async (e) => {
    e.preventDefault();
    const userData={
      firstname:firstname,
      lastname:lastname,
      email:email,
      password:password,
      role:"user",
    }
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/register`,userData);
    if(response.status==200||response.status==201){
      setUser(response.data)
      navigate("/home");
    }
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };


  return (
    <div className="h-[90vh] w-full p-4 flex flex-col justify-between items-center bg-gray-50">
      <div className="w-full flex flex-col items-center">
        <img src={logo} className="h-12 mb-6" alt="Ola_Logo" />

        <form
          onSubmit={(e) => HandlerFunction(e)}
          className="w-full max-w-sm bg-white p-6"
        >
          <h1 className="text-lg font-semibold mb-2">What's your name</h1>
          <div className="flex items-center justify-center">
            <input
              type="text"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-6/12 px-3 py-2 mb-4 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black mr-2"
              placeholder="First name"
            />
            <input
              type="text"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-6/12 px-3 py-2 mb-4 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black"
              placeholder="Last name"
            />
          </div>
          <h1 className="text-lg font-semibold mb-2">What's your email</h1>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full px-3 py-2 mb-4 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black"
          />

          <h1 className="text-lg font-semibold mb-2">Enter Password</h1>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="w-full px-3 py-2 mb-6 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full mb-2 bg-black text-white text-lg font-semibold py-2 rounded hover:bg-gray-900 transition-all"
          >
            Create Account
          </button>

          <h1 className="text-center font-semibold text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700">
              Login here
            </Link>
          </h1>
        </form>
      </div>
      <p className=" max-w-sm mb-2  text-gray-600 text-[10px] px-4 text-center ">
        By proceeding, you consent to get calls, WhatsApp or SMS messages,
        including by automated means, from Ola and its affiliates to the number
        provided
      </p>
    </div>
  );
};

export default UserSignup;
