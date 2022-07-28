import React from 'react';
import BaseHeading from '../BaseHeading';
import BaseTitle from '../BaseTitle';
import HeadingBox from '../HeadingBox';

const ElectivesHeading = ({ desc, foot_desc, isBorder = false, title }) => {
  return (
    <BaseHeading>
      <HeadingBox>B</HeadingBox>

      <div>
        <BaseTitle>{title}</BaseTitle>
        <div
          className={`text-sm ${isBorder && 'pb-3'}`}
          dangerouslySetInnerHTML={{ __html: desc }}
        />
        <div className={`${isBorder && 'border-t border-solid border-nus-gray-400 pt-3'}`}></div>
        <div
          className='text-sm text-nus-gray-400'
          dangerouslySetInnerHTML={{ __html: foot_desc }}
        />
      </div>
    </BaseHeading>
  );
};

export default ElectivesHeading;
