import Image from 'next/image';
import React from 'react';

import BuildJourneyStep from '../../components/BuildJourneyStep';
import HeadingInformation from '../../components/HeadingInformation';
import ImageRecommend from '../../public/images/recommened.png';

const BuildJourney = () => {
  return (
    <div className=''>
      <header className='grid md:grid-cols-3 gap-5 px-7 mb-9'>
        <figure className='self-end'>
          <HeadingInformation
            title={'Build your own MBA journey'}
            desc={`Follow these simple steps to design your own journey matching your
          career aspirations.`}
          />
        </figure>

        <figure className='self-end'>
          <Image src={ImageRecommend} alt='thumb' />
        </figure>
      </header>

      <div className='md:px-7'>
        <div className='bg-nus-gray-200 py-10 px-7 md:p-10 md:rounded-xl'>
          <BuildJourneyStep />
        </div>
      </div>
    </div>
  );
};

export default BuildJourney;
