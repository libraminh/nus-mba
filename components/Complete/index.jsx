import React from "react";
import ModulePanel from "../ModulePanel";
import BaseTitle from "../BaseTitle";

const Complete = ({ onClick = () => {}, isSpecialJourney = false }) => {
  return (
    <div className="px-7 py-10 p-10 bg-nus-blue-800 rounded-xl text-white space-y-7">
      {!isSpecialJourney && (
        <div>
          <div className="mb-1">
            <BaseTitle>
              <span className="text-white">Complete your journey</span>
            </BaseTitle>
          </div>
          <p className="text-sm">
            All done? Take a look at what you have built.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-4">
        <ModulePanel
          onClick={onClick}
          title={`${isSpecialJourney ? "Save Journey" : "Complete Journey"}`}
        />
      </div>
    </div>
  );
};

export default Complete;
