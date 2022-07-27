import React from "react";

const HeadingBox = ({ children, customClass = "text-nus-black-200" }) => {
  return (
    <div
      style={{ width: "50px", height: "47px" }}
      className={`flex items-center justify-center text-2.5xl font-bold bg-white rounded-xl px-4 py-1 shadow-md ${customClass}`}
    >
      {children}
    </div>
  );
};

export default HeadingBox;
