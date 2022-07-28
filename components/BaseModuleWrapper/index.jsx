import React from "react";

const BaseModuleWrapper = ({ children, className }) => {
  return (
    <div className={`px-6 md:px-7 space-y-16 ${className}`}>{children}</div>
  );
};

export default BaseModuleWrapper;
