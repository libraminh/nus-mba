import React from 'react';
import BaseHeading from '../BaseHeading';
import BaseTitle from '../BaseTitle';
import HeadingBox from '../HeadingBox';

const FoundationHeading = ({ desc, title }) => {
  return (
    <BaseHeading>
      <HeadingBox>A</HeadingBox>

      <div>
        <BaseTitle>{title}</BaseTitle>

        <div className='text-sm' dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
    </BaseHeading>
  );
};

export default FoundationHeading;
