import Image from 'next/image';
import React from 'react';
import Sprite1Image from '../../public/images/sprite-1.png';
import BtnArrow from '../BtnArrow';

const FeaturedCard = ({
  theme = 'blue',
  heading,
  subHeading,
  imageUrl,
  onClick,
  className = '',
  imageClassName,
  customSubHeadingClass,
}) => {
  const themeCard =
    theme === 'blue' ? 'bg-nus-blue-800 text-white' : 'bg-white';

  return (
    <div
      onClick={onClick}
      className={`relative ${themeCard} rounded-xl pt-5 pb-3 px-6 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out cursor-pointer ${className}`}
    >
      <figure className='h-full flex flex-col'>
        <h3
          className={`${
            theme === 'blue' ? 'text-white' : 'text-nus-black-200'
          } text-base font-bold mb-2`}
        >
          {heading}
        </h3>
        <span
          className={`inline-block text-sm mb-7 max-w-[180px] ${customSubHeadingClass}`}
        >
          {subHeading}
        </span>

        <BtnArrow className='mt-auto' theme={theme} />
      </figure>

      <div className='absolute bottom-0 right-10'>
        {imageUrl ? (
          <div className='relative'>
            <Image
              className={imageClassName}
              src={imageUrl}
              alt='thumb'
              objectFit='contain'
              objectPosition='left bottom'
              width={135}
              height={101}
              priority
            />
          </div>
        ) : (
          <Image className={imageClassName} src={Sprite1Image} alt='thumb' />
        )}
      </div>
    </div>
  );
};

export default FeaturedCard;
