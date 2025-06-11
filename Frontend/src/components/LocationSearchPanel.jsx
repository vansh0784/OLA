import React from 'react';

const LocationSearchPanel = ({vehiclePanel,setvehiclePanel,setIsFocused}) => {
  const dummySuggestions = [
    "Home - 123 Main Street",
    "Work - 456 Office Plaza",
    "Gym - 789 Fitness Ave",
    "Favorite Cafe - 101 Coffee Blvd",
  ];

  return (
    <div className='p-1'>
      {dummySuggestions.map((loc, i) => (
        <div
          key={i}
          onClick={()=>{
            setvehiclePanel(!vehiclePanel)
            setIsFocused(false)
          }
          }
          className='flex items-center gap-2 px-1 py-2 mb-3  rounded cursor-pointer hover:bg-gray-100 transition-all duration-200'
        >
          <i className="ri-map-pin-fill bg-[#eee] rounded-full px-1  text-lg"></i>
          <h1 className='text-md text-black'>{loc}</h1>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
