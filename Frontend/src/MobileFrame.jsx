import React from "react";

const MobileFrame = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center p-4">
      <div className="bg-white w-[360px] max-w-full h-[90vh] rounded-2xl shadow-xl overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default MobileFrame;
