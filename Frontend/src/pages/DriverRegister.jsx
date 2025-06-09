import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/oladriver.png";
import axios from "axios"
const DriverRegister = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const navigate=useNavigate();

  const [data, setData] = useState({});

  const HandlerFunction =async (e) => {
    e.preventDefault();
    const driver_data={
      firstname,
      lastname,
      email,
      password,
      role:"driver",
      vehiclePlate,
      vehicleColor,
      capacity,
      vehicleType
    }
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/register`,driver_data);
    if(response.status==200){
      console.log(response.data);
      navigate('/home');
    }
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setVehiclePlate("");
    setVehicleColor("");
    setCapacity("");
    setVehicleType("");
  };

  return (
    <div className="min-h-screen w-full p-4 pb-8 flex flex-col justify-between items-center bg-gray-50">
      <div className="w-full flex flex-col items-center">
        <img src={logo} className="h-20 mb-6" alt="Ola_Logo" />

        <form
          onSubmit={HandlerFunction}
          className="w-full max-w-sm bg-white p-6"
        >
          <h1 className="text-lg font-semibold mb-2">What's your name</h1>
          <div className="flex items-center justify-center">
            <input
              type="text"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-6/12 px-3 py-2 mb-4 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black text-sm mr-2"
              placeholder="First name"
            />
            <input
              type="text"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-6/12 text-sm px-3 py-2 mb-4 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black"
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
            className="w-full px-3 text-sm py-2 mb-4 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black"
          />

          <h1 className="text-lg font-semibold mb-2">Enter Password</h1>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="w-full text-sm px-3 py-2 mb-6 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black"
          />

          <h1 className="text-lg font-semibold mb-2">Vehicle Information</h1>
          <div className="flex items-center justify-center">
            <input
              type="text"
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="w-6/12 px-3 py-2 mb-4 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black mr-2 text-sm"
              placeholder="Vehicle Plate"
            />
            <input
              type="text"
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="w-6/12 px-3 py-2 mb-4 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black text-sm"
              placeholder="Vehicle Color"
            />
          </div>

          <div className="flex items-center justify-center">
            <input
              type="text"
              required
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-6/12 px-3 py-2 mb-4 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black mr-2 text-sm"
              placeholder="Capacity"
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-6/12 px-3 py-2 mb-4 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 focus:ring-black text-sm"
            >
              <option value="">Select Vehicle</option>
              <option value="Rickshaw">Rickshaw</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full my-2 bg-black text-white text-lg font-semibold py-2 rounded hover:bg-gray-900 transition-all"
          >
            Create Account
          </button>

          <h1 className="text-center font-semibold text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login-driver" className="text-blue-700">
              Login here
            </Link>
          </h1>
        </form>
      </div>

      <p className="max-w-sm text-gray-600 text-[10px] px-4 text-center mt-4">
        By proceeding, you consent to get calls, WhatsApp or SMS messages,
        including by automated means, from Ola and its affiliates to the number
        provided.
      </p>
    </div>
  );
};

export default DriverRegister;
