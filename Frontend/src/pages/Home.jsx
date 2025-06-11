import React, { useState } from "react";
import logo from "../assets/olalogo.png";
import map from "../assets/map.png";
import LocationSearchPanel from "../components/LocationSearchPanel";

import VehiclePanel from "../components/VehiclePanel";
import ConfirmPanel from "../components/ConfirmPanel";

const Home = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [confirmPanel, setConfirmPanel] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="relative h-[90vh] bg-cover bg-center transition-all duration-300"
      style={{ backgroundImage: `url(${map})` }}
    >
      <img src={logo} alt="ola-logo" className=" left-4 top-4 absolute h-8" />

      <div className="absolute bottom-0 left-0 w-full ">
        <div
          className={`absolute w-1 h-[50px] bg-gray-900 ${
            isFocused == true ? "top-[13%]" : "top-[40%]"
          }  left-7 rounded-full`}
        ></div>
        <div
          className={`transition-all duration-300 bg-gray-50 p-4 rounded-t-2xl z-40 w-full ${
            isFocused ? "h-[90vh]" : "h-[30vh]"
          }`}
        >
          <h1 className="text-2xl font-bold mb-4">
            <h3 className="absolute top-4 right-6">
              <i
                className="ri-arrow-down-wide-line text-gray-700 text-2xl"
                onClick={() => setIsFocused(!isFocused)}
              ></i>
            </h3>
            Find a Trip
          </h1>

          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setpickup(e.target.value)}
              placeholder="Add a pick-up location"
              className="w-full px-7 py-2 mb-4 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 text-sm focus:ring-black"
              onFocus={() => setIsFocused(true)}
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => setdestination(e.target.value)}
              placeholder="Enter your destination"
              className="w-full px-7 py-2 mb-4 bg-[#eeeeee] border border-gray-300 rounded focus:ring-2 text-sm focus:ring-black"
              onFocus={() => setIsFocused(true)}
            />
          </form>

          {isFocused && (
            <LocationSearchPanel
              vehiclePanel={vehiclePanel}
              setvehiclePanel={setvehiclePanel}
              setIsFocused={setIsFocused}
            />
          )}
        </div>
      </div>
      {vehiclePanel && <VehiclePanel vehiclePanel={vehiclePanel}
              setvehiclePanel={setvehiclePanel} confirmPanel={confirmPanel} setConfirmPanel={setConfirmPanel} />}
      {
        confirmPanel&&<ConfirmPanel/>
      }
    </div>
  );
};

export default Home;
