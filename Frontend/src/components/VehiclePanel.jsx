import React from "react";
import car from "../assets/newcar.jpg";
import bike from "../assets/motorbike.webp";
import rickshaw from "../assets/rickshaw.webp";
import { useTrip } from "../context/TripContext";

const VehiclePanel = () => {
  const { setvehiclePanel, setConfirmPanel } = useTrip();

  const vehicles = [
    {
      type: "OlaGo",
      seats: 4,
      eta: "2 mins",
      time: "15:24",
      price: "₹ 193.26",
      img: car,
      description: "Affordable, compact rides",
    },
    {
      type: "Rickshaw",
      seats: 3,
      eta: "2 mins",
      time: "15:24",
      price: "₹ 143.26",
      img: rickshaw,
      description: "Affordable, compact rides",
    },
    {
      type: "Bike",
      seats: 2,
      eta: "2 mins",
      time: "15:24",
      price: "₹ 93.26",
      img: bike,
      description: "Affordable, compact rides",
    },
  ];

  const handleVehicleClick = () => {
    setvehiclePanel(false);
    setConfirmPanel(true);
  };

  return (
    <div className="absolute bottom-0 left-0 w-full px-5 py-3 bg-white h-[55%] z-[100]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Choose vehicle</h1>
          <button
            type="button"
            className="absolute top-4 right-6"
            onClick={() => setvehiclePanel(false)}
            aria-label="Close vehicle panel"
          >
            <i className="ri-arrow-down-wide-line text-gray-700 text-2xl"></i>
          </button>
        </div>

        {vehicles.map((vehicle) => (
          <div
            key={vehicle.type}
            onClick={handleVehicleClick}
            role="button"
            tabIndex={0}
            className="flex items-start justify-between mb-2 border-gray-100 hover:border-black border-3 rounded-xl p-2 cursor-pointer transition-transform hover:scale-[1.01]"
          >
            <img className="h-11 object-cover" src={vehicle.img} alt={vehicle.type} />
            <div className="flex flex-col items-start justify-center flex-1 px-3">
              <p className="font-bold text-lg">
                {vehicle.type}{" "}
                <span className="text-sm">
                  <i className="ri-user-6-fill text-lg"></i>
                  {vehicle.seats}
                </span>
              </p>
              <p className="text-sm">
                {vehicle.eta} <span>{vehicle.time}</span>
              </p>
              <p className="text-gray-600 text-xs">{vehicle.description}</p>
            </div>
            <p className="font-bold text-lg">{vehicle.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclePanel;
