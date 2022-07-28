import React from 'react';
import BaseHeading from '../BaseHeading';
import BaseTitle from '../BaseTitle';
import HeadingBox from '../HeadingBox';

const ExperiencesHeading = ({ desc, title }) => {
  return (
    <BaseHeading>
      <HeadingBox>C</HeadingBox>

      <div>
        <BaseTitle>{title}</BaseTitle>

        <div className='text-sm' dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
    </BaseHeading>
  );
};

export default ExperiencesHeading;
