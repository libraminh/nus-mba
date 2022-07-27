import Link from 'next/link';
import React from 'react';
import { BUILD_JOURNEY_PAGE } from '../../constant';
import FeaturedCard from '../FeaturedCard';

const HomeMBARecommended = ({ journeys }) => {
  return (
    <section className='md:px-7'>
      <div className='bg-nus-gray-200 py-10 px-7 md:p-10 md:rounded-xl'>
        <h2 className='text-lg font-bold text-nus-black-200 mb-4'>
          Explore recommended MBA journeys
        </h2>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {journeys?.map((item, index) => (
            <React.Fragment key={item.jID}>
              <Link href={`journey/${item.jID}`}>
                <a>
                  <FeaturedCard
                    theme='white'
                    heading={item.title}
                    subHeading={item.desc}
                    imageUrl={item.img}
                    imageClassName='w-1/2 ml-auto'
                    className='h-full'
                  />
                </a>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>

      <figure className='self-end space-x-5 py-7 px-7 md:px-0'>
        <Link href={BUILD_JOURNEY_PAGE}>
          <a className='block w-full md:max-w-[350px]'>
            <FeaturedCard
              heading='Create your own MBA journey'
              subHeading='Indicate your career interest, and we will recommend a customised MBA journey for you.'
              customSubHeadingClass={`!max-w-[220px]`}
            />
          </a>
        </Link>
      </figure>
    </section>
  );
};

export default HomeMBARecommended;
