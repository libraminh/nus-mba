import Image from 'next/image';
import React from 'react';
import NextBlueArrow from '../../public/images/next-blue-arrow.png';
import NextArrow from '../../public/images/next.png';

const BtnArrow = ({
  theme = 'blue',
  onClick = () => {},
  className,
  iconClassName,
}) => {
  const handleOnClick = () => {
    onClick();
  };

  const btnTheme = theme == 'blue' ? 'bg-white' : 'bg-nus-blue-800';

  return (
    <span
      className={`cursor-pointer rounded-lg ${btnTheme} w-43 h-10 flex items-center justify-center ${className}`}
      onClick={handleOnClick}
    >
      {theme == 'blue' ? (
        <Image className={iconClassName} src={NextBlueArrow} alt='thumb' />
      ) : (
        <Image className={iconClassName} src={NextArrow} alt='thumb' />
      )}
    </span>
  );
};

export default BtnArrow;
