import React, { createContext, useState } from "react";

export const DriverDataContext = createContext();

const DriverContext = ({ children }) => {
  const [driver, setDriver] = useState({
    email: '',
    fullname: {
      firstname: '',
      lastname: '',
    },
    vehicle: {
      vehiclePlate: '',
      vehicleColor: '',
      vehicleType: '',
      capacity: '',
    },
  });

  return (
    <DriverDataContext.Provider value={[driver, setDriver]}>
      {children}
    </DriverDataContext.Provider>
  );
};

export default DriverContext;
