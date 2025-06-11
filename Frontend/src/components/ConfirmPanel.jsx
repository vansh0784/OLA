import React from "react";
import car from "../assets/newcar.jpg";

const ConfirmPanel = () => {
  return (
    <div className="bg-white w-full z-101 h-[70%] absolute bottom-0 right-0 rounded-xl">
        <h1 className="px-4 py-3 font-bold text-lg ">Confirm your Ride</h1>
      <div className="flex flex-col justify-between gap-4 px-4 py-3">
        <img src={car} className="h-20 object-contain" alt="car" />
        <hr className="w-full border-gray-300" />

        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-2">
            <div className="text-xl bg-[#eee] px-3 py-2 rounded-full">
              <i className="ri-map-pin-2-fill"></i>
            </div>
            <div className="border-b border-gray-300 pb-2 w-full">
              <h1 className="font-bold text-lg">562/11A</h1>
              <h3 className="text-gray-600 text-sm">Noida Sector-22, Uttar Pradesh</h3>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="text-xl bg-[#eee] px-3 py-2 rounded-full">
              <i className="ri-square-fill"></i>
            </div>
            <div className="border-b border-gray-300 pb-2 w-full">
              <h1 className="font-bold text-lg">Gautam Buddha University</h1>
              <h3 className="text-gray-600 text-sm">Greater Noida, Uttar Pradesh</h3>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="text-xl bg-[#eee] px-3 py-2 rounded-full">
              <i className="ri-bank-card-2-fill"></i>
            </div>
            <div>
              <h1 className="font-bold text-lg">₹ 193.26</h1>
              <h3 className="text-gray-600 text-sm">Cash</h3>
            </div>
          </div>
        </div>

        <button className="mt-2 cursor-pointer rounded-xl px-5 py-2 bg-[#eee] hover:bg-green-600 hover:text-white transition duration-300">
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmPanel;
