import React from "react";
import UserLogin from "./pages/UserLogin";
import UserLogout from "./pages/UserLogout";
import UserSignup from "./pages/UserSignup";
import { Routes, Route } from "react-router-dom";
import DriverLogin from "./pages/DriverLogin";
import DriverLogout from "./pages/DriverLogout";
import DriverRegister from "./pages/DriverRegister";
import Start from "./pages/Start";
import MobileFrame from "./MobileFrame";
import Home from "./pages/Home";
import { TripProvider } from "./context/TripContext";

const App = () => {
  return (
    <TripProvider>
      <MobileFrame>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/logout" element={<UserLogout />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/login-driver" element={<DriverLogin />} />
          <Route path="/logout-driver" element={<DriverLogout />} />
          <Route path="/signup-driver" element={<DriverRegister />} />
        </Routes>
      </MobileFrame>
    </TripProvider>
  );
};

export default App;
