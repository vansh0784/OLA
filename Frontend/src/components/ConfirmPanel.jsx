import React from "react";
import car from "../assets/newcar.jpg";
import LookingForDriver from "./LookingForDriver";
import { useTrip } from "../context/TripContext";

const ConfirmPanel = () => {
  const {
    lookDriver, setLookDriver,
    confirmPanel, setConfirmPanel
  } = useTrip();

  const handleConfirmPanel = () => {
    setConfirmPanel(false);
    setLookDriver(true);
  };

  const rideInfo = [
    {
      icon: "ri-map-pin-2-fill",
      title: "562/11A",
      subtitle: "Noida Sector-22, Uttar Pradesh",
    },
    {
      icon: "ri-square-fill",
      title: "Gautam Buddha University",
      subtitle: "Greater Noida, Uttar Pradesh",
    },
    {
      icon: "ri-bank-card-2-fill",
      title: "₹ 193.26",
      subtitle: "Cash",
    },
  ];

  return (
    <>
      <div className="bg-white w-full z-101 h-[70%] absolute bottom-0 right-0 rounded-xl">
        <h1 className="px-4 py-3 font-bold text-lg">Confirm your Ride</h1>
        <div className="flex flex-col gap-4 px-4 py-3">
          <img src={car} className="h-20 object-contain" alt="car" />
          <hr className="w-full border-gray-300" />

          {rideInfo.map((info, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="text-xl bg-[#eee] px-3 py-2 rounded-full">
                <i className={info.icon}></i>
              </div>
              <div className={index < 2 ? "border-b border-gray-300 pb-2 w-full" : ""}>
                <p className="font-bold text-lg">{info.title}</p>
                <p className="text-gray-600 text-sm">{info.subtitle}</p>
              </div>
            </div>
          ))}

          <button
            onClick={handleConfirmPanel}
            className="mt-2 rounded-xl px-5 py-2 bg-[#eee] hover:bg-green-600 hover:text-white transition duration-300"
          >
            Confirm Ride
          </button>
        </div>
      </div>

      {lookDriver && <LookingForDriver />}
    </>
  );
};

export default ConfirmPanel;
