import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import UserContext from "./context/UserContext.jsx";
import DriverContext from "./context/driverContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DriverContext>
    <UserContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContext>
    </DriverContext>
  </StrictMode>
);
