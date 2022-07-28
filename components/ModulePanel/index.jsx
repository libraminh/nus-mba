import React from "react";
import BtnArrow from "../BtnArrow";

const ModulePanel = ({ title, type = "", boxContent, onClick = () => {} }) => {
  return (
    <figure
      className={`rounded-xl ${
        type === "custom" ? "bg-nus-orange-400" : "bg-white"
      } p-4 flex justify-between items-center space-x-2 md:space-x-4 min-w-220 md:min-w-0`}
    >
      {boxContent && boxContent}

      <span
        className={`text-base font-bold leading-17 flex-1 ${
          type === "custom" ? "text-white" : "text-nus-black-200"
        }`}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      <BtnArrow theme="white" onClick={onClick} />
    </figure>
  );
};

export default ModulePanel;
