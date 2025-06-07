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
const App = () => {
  return (
    <div>

        <MobileFrame>
          <Routes>
            <Route path="/login" element={<UserLogin />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/logout" element={<UserLogout />}></Route>
            <Route path="/signup" element={<UserSignup />}></Route>
            <Route path="/" element={<Start />}></Route>
            <Route path="/login-driver" element={<DriverLogin />}></Route>
            <Route path="/logout-driver" element={<DriverLogout />}></Route>
            <Route path="/signup-driver" element={<DriverRegister />}></Route>
          </Routes>
        </MobileFrame>
    </div>
  );
};

export default App;
