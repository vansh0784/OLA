import React from "react";
import { useTrip } from "../context/TripContext";

const LocationSearchPanel = () => {
  const suggestions = [
    { label: "Home", address: "123 Main Street" },
    { label: "Work", address: "456 Office Plaza" },
    { label: "Gym", address: "789 Fitness Ave" },
    { label: "Favorite Cafe", address: "101 Coffee Blvd" },
  ];

  const { vehiclePanel, setvehiclePanel, setIsFocused } = useTrip();

  const handleSelect = () => {
    setvehiclePanel(!vehiclePanel);
    setIsFocused(false);
  };

  return (
    <div className="p-2">
      {suggestions.map((loc, i) => (
        <div
          key={i}
          onClick={handleSelect}
          className="flex items-center gap-3 px-3 py-2 mb-2 rounded cursor-pointer hover:bg-gray-100 transition-all"
        >
          <i className="ri-map-pin-fill bg-[#eee] text-lg rounded-full px-2 py-1"></i>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{loc.label}</span>
            <span className="text-xs text-gray-600">{loc.address}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
