import React from "react";

const BaseHeading = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 ${className}`}
    >
      {children}
    </div>
  );
};

export default BaseHeading;
