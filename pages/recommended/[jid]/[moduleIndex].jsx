import BackIcon from '@/components/BackIcon';
import Complete from '@/components/Complete';
import ElectiveModules from '@/components/ElectiveModules';
import ExperienceModules from '@/components/ExperienceModules';
import FeaturedCard from '@/components/FeaturedCard';
import FoundationModules from '@/components/FoundationModules';
import LoadingScreen from '@/components/LoadingScreen';
import ModulePanel from '@/components/ModulePanel';
import SwitchPersona from '@/components/SwitchPersona';
import { useFetchJourney } from '@/hooks/useFetchJourney';
import { useFloatingNav } from '@/hooks/useFloatingNav';
import { useSpcialLinks } from '@/hooks/useSpcialLinks';
import { useSpecialHeading } from '@/hooks/useSpecialHeading';
import { useSpecialJourneys } from '@/hooks/useSpecialJourney';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getJourney } from '../../../api';
import CustomiseJourneyImage from '../../../public/images/customise-journey.png';

const RecommendedDetail = () => {
  const router = useRouter();

  const { moduleIndex, jid } = router?.query;

  const { isFetching, journeyDetail, refetch } = useFetchJourney(jid);
  useQuery(['journeys'], getJourney);

  const isSpecialJourney = useSpecialJourneys(journeyDetail);
  const realEstateSubHeading = useSpecialHeading(journeyDetail);
  const handleExternalLink = useSpcialLinks(journeyDetail);
  // const { floatingNav, floatingNavClasses } = useFloatingNav();

  const handleBack = () => {
    router.push({
      pathname: `/journey/${jid}`,
    });
  };

  const renderContent = () => {
    switch (moduleIndex) {
      case '1':
        return (
          <FoundationModules
            layout='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            showHeading={false}
            journeyData={journeyDetail?.data}
          />
        );

      case '2':
        return (
          <ElectiveModules
            layout='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            showHeading={false}
            coreModules={journeyDetail.data.electives}
          >
            {isSpecialJourney && (
              <figure className='space-y-4'>
                <p className='text-sm'>{realEstateSubHeading}</p>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                  <ModulePanel
                    onClick={handleExternalLink}
                    title={'Explore More'}
                    type='custom'
                  />
                </div>
              </figure>
            )}
          </ElectiveModules>
        );

      case '3':
        return (
          <ExperienceModules
            showHeading={false}
            coreModules={journeyDetail.data.experiences}
            specialModules={journeyDetail.data.student_clubs}
          />
        );

      default:
        return;
    }
  };

  const renderHeading = useMemo(() => {
    return journeyDetail?.data.general.sections[moduleIndex - 1].title;
  }, [journeyDetail, moduleIndex]);

  const switchPersona = (item) => {
    router.push({
      pathname: `/recommended/${item.jID}/${moduleIndex}`,
    });

    setTimeout(() => {
      refetch();
    }, 100);
  };

  return (
    <div>
      <figure className='px-7 inline-flex items-center mb-5 space-x-4'>
        <span
          onClick={handleBack}
          className='flex items-end space-x-4 cursor-pointer'
        >
          <BackIcon />
          <span className='text-xl'>Back to journey overview</span>
        </span>
      </figure>

      <div className='px-7 mb-10 md:mb-8 space-y-3'>
        <span className='text-26 font-bold text-nus-black-200 px-12'>
          {renderHeading}
        </span>

        <SwitchPersona
          jID={jid}
          handleOnClick={switchPersona}
          layout={'grid grid-cols-1 md:grid-cols-4 gap-5'}
        />
      </div>

      <div className='md:px-7'>{renderContent()}</div>

      {isSpecialJourney ? (
        <div className='px-5 md:px-7 pb-10 md:pb-14 mt-10'>
          <Link
            href={{
              pathname: '/journey',
              query: { jID: jid },
            }}
          >
            <a>
              <Complete
                isSpecialJourney={isSpecialJourney}
                customModulePanelLayout={``}
              />
            </a>
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-7 py-10'>
          <Link
            href={{
              pathname: '/journey',
              query: { jID: jid },
            }}
            className='inline-block'
          >
            <a>
              <FeaturedCard
                heading='Customise from a journey'
                subHeading='Use this journey as a starting point to review and select other electives and experiences'
                imageUrl={CustomiseJourneyImage}
                customSubHeadingClass={`!max-w-[220px]`}
              />
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecommendedDetail;

export async function getStaticProps({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('journeyDetail', () =>
    useFetchJourney(params.jid)
  );
  await queryClient.prefetchQuery('journeys', getJourney);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export async function getStaticPaths() {
  const resJourneys = await getJourney();

  const paths1 = resJourneys?.data?.journeys.map((item) => ({
    params: { jid: String(item.jID), moduleIndex: String(1) },
  }));
  const paths2 = resJourneys?.data?.journeys.map((item) => ({
    params: { jid: String(item.jID), moduleIndex: String(2) },
  }));
  const paths3 = resJourneys?.data?.journeys.map((item) => ({
    params: { jid: String(item.jID), moduleIndex: String(3) },
  }));
  const paths = [...paths1, ...paths2, ...paths3];

  return { paths, fallback: false };
}
