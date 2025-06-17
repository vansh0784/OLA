import React from "react";
import car from "../assets/newcar.jpg";

const LookingForDriver = () => {
  const pickup = {
    title: "562/11A",
    location: "Noida Sector-22, Uttar Pradesh",
  };

  const destination = {
    title: "Gautam Buddha University",
    location: "Greater Noida, Uttar Pradesh",
  };

  const fare = "₹ 193.26";
  const payment = "Cash";

  return (
    <div className="bg-white w-full z-[101] h-[70%] absolute bottom-0 right-0 rounded-xl">
      <h1 className="px-4 py-3 font-bold text-lg">Looking For Driver</h1>
      <div className="flex flex-col gap-4 px-4 py-3">
        <img src={car} className="h-20 object-contain" alt="car" />
        <hr className="w-full border-gray-300" />

        {/* Pickup */}
        <div className="flex items-start gap-2">
          <div className="text-xl bg-[#eee] px-3 py-2 rounded-full">
            <i className="ri-map-pin-2-fill"></i>
          </div>
          <div className="border-b border-gray-300 pb-2 w-full">
            <h1 className="font-bold text-lg">{pickup.title}</h1>
            <h3 className="text-gray-600 text-sm">{pickup.location}</h3>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-2">
          <div className="text-xl bg-[#eee] px-3 py-2 rounded-full">
            <i className="ri-square-fill"></i>
          </div>
          <div className="border-b border-gray-300 pb-2 w-full">
            <h1 className="font-bold text-lg">{destination.title}</h1>
            <h3 className="text-gray-600 text-sm">{destination.location}</h3>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-2">
          <div className="text-xl bg-[#eee] px-3 py-2 rounded-full">
            <i className="ri-bank-card-2-fill"></i>
          </div>
          <div>
            <h1 className="font-bold text-lg">{fare}</h1>
            <h3 className="text-gray-600 text-sm">{payment}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
