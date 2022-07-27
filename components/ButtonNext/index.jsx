import React from 'react';

const ButtonNext = ({ onClick, className = '', children }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-nus-blue-800 inline-flex items-center rounded-xl px-5 py-4 text-base font-bold text-white cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

export default ButtonNext;
