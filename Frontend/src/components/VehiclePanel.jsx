import React from "react";
import car from "../assets/newcar.jpg";
import bike from "../assets/motorbike.webp";
import rickshaw from "../assets/rickshaw.webp";
const VehiclePanel = (props) => {
  console.log(props)
  return (
    <div className="absolute bottom-0 left-0 w-full px-5 py-3 bg-white h-[55%] z-100">
      <div>
        <h1 className="text-2xl font-bold mb-4">
          <h3 className="absolute top-4 right-6">
            <i
              className="ri-arrow-down-wide-line text-gray-700 text-2xl"
              onClick={() => props.setvehiclePanel(!props.vehiclePanel)}
            ></i>
          </h3>
          Choose vehicle
        </h1>
        <div onClick={()=>props.setvehiclePanel(!props.vehiclePanel)}>
          <div onClick={()=>{
            props.setConfirmPanel(!props.confirmPanel)
          }} className="flex items-start justify-between mb-2 border-gray-100 hover:border-black cursor-pointer border-3 rounded-xl py-2 px-2  ">
            <img className="h-10 object-cover" src={car} alt="car" />
            <div className="flex flex-col items-start justify-center">
              <h1>
                <h2 className="font-bold text-lg">
                  OlaGo{" "}
                  <span className="text-sm">
                    <i className="ri-user-6-fill text-lg"></i>4
                  </span>
                </h2>
              </h1>
              <h1 className="text-sm">
                2 mins away <span>15:24</span>
              </h1>
              <p className="text-gray-600 text-xs">
                {" "}
                Affordable, compact rides
              </p>
            </div>
            <h1 className="font-bold text-lg">₹ 193.26</h1>
          </div>
          <div onClick={()=>{
            props.setConfirmPanel(!props.confirmPanel)
          }}  className="flex items-start justify-between mb-2 border-gray-100 hover:border-black cursor-pointer border-3 rounded-xl py-2 px-2 ">
            <img
              className="h-11 object-cover"
              src={rickshaw}
              alt="auto-rickshaw"
            />
            <div className="flex flex-col items-start justify-center">
              <h1>
                <h2 className="font-bold text-lg">
                  Rickshaw{" "}
                  <span className="text-sm">
                    <i className=" text-lg ri-user-6-fill"></i>3
                  </span>
                </h2>
              </h1>
              <h1 className="text-sm">
                2 mins away <span>15:24</span>
              </h1>
              <p className="text-gray-600 text-xs">
                {" "}
                Affordable, compact rides
              </p>
            </div>
            <h1 className="font-bold text-lg">₹ 143.26</h1>
          </div>
          <div onClick={()=>{
            props.setConfirmPanel(!props.confirmPanel)
          }}  className="flex items-start justify-between mb-2 hover:border-black cursor-pointer border-gray-100 border-3 rounded-xl p-2   ">
            <img className="h-11 object-cover" src={bike} alt="bike" />
            <div className="flex flex-col items-start justify-start">
              <h1>
                <h2 className="font-bold text-lg">
                  Bike{" "}
                  <span className="text-sm">
                    <i className="ri-user-6-fill text-lg"></i>2
                  </span>
                </h2>
              </h1>
              <h1 className="text-sm">
                2 mins away . <span>15:24</span>
              </h1>
              <p className="text-gray-600 text-xs">
                {" "}
                Affordable, compact rides
              </p>
            </div>
            <h1 className="font-bold text-lg">₹ 93.26</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclePanel;
