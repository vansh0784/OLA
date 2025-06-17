import React from "react";
import logo from "../assets/olalogo.png";
import map from "../assets/map.png";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmPanel from "../components/ConfirmPanel";
import LookingForDriver from "../components/LookingForDriver";
import { useTrip } from "../context/TripContext";

const Home = () => {
  const {
    isFocused, setIsFocused,
    vehiclePanel,
    pickup, setpickup,
    destination, setdestination,
    confirmPanel,
    lookDriver,
  } = useTrip();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="relative h-[90vh] bg-cover bg-center transition-all duration-300"
      style={{ backgroundImage: `url(${map})` }}
    >
      <img src={logo} alt="ola-logo" className=" left-4 top-4 absolute h-8" />

      <div className="absolute bottom-0 left-0 w-full">
        <div
          className={`absolute w-1 h-[50px] bg-gray-900 ${
            isFocused ? "top-[13%]" : "top-[40%]"
          } left-7 rounded-full`}
        ></div>

        <div
          className={`transition-all duration-300 bg-gray-50 p-4 rounded-t-2xl z-40 w-full ${
            isFocused ? "h-[90vh]" : "h-[30vh]"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Find a Trip</h1>
            <button
              type="button"
              className="absolute top-4 right-6"
              onClick={() => setIsFocused(!isFocused)}
            >
              <i className="ri-arrow-down-wide-line text-gray-700 text-2xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
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

          {isFocused && <LocationSearchPanel />}
        </div>
      </div>

      {vehiclePanel && <VehiclePanel />}
      {confirmPanel && <ConfirmPanel />}
      {lookDriver && <LookingForDriver />}
    </div>
  );
};

export default Home;
