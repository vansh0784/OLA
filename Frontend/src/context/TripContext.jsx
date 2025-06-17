import {createContext, useContext, useState } from "react";

const TripContext = createContext();
export const useTrip = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [confirmPanel, setConfirmPanel] = useState(false);
  const [lookDriver, setLookDriver] = useState(false);
  return (
    <TripContext.Provider
      value={{
        isFocused,
        confirmPanel,
        lookDriver,
        pickup,
        destination,
        vehiclePanel,
        setvehiclePanel,
        setpickup,
        setdestination,
        setLookDriver,
        setIsFocused,
        setConfirmPanel,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
