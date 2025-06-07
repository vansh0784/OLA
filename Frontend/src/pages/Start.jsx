import React from "react";
import logo from "../assets/olalogo11.png";
import heroBanner from "../assets/heroBanner2.jpg";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div
        className="relative w-full h-2/3 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <img
          className="absolute top-4 left-4 h-20 z-50"
          src={logo}
          alt="olalogo"
        />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <h1 className="font-bold text-black text-2xl mb-4 text-center">Get Started With Ola</h1>
        <Link
          to="/login"
          className="inline-block w-full max-w-sm px-4 py-2 bg-black text-white text-center rounded-md"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;
