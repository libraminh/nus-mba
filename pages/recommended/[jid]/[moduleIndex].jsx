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
import { useSpcialLinks } from '@/hooks/useSpcialLinks';
import { useSpecialHeading } from '@/hooks/useSpecialHeading';
import { useSpecialJourneys } from '@/hooks/useSpecialJourney';
import { useIsFetching } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useFetchJourneys } from '../../../hooks/useFetchJourneys';
import { useFloatingNav } from '../../../hooks/useFloatingNav';
import CustomiseJourneyImage from '../../../public/images/customise-journey.png';

const RecommendedDetail = () => {
  const router = useRouter();
  const { moduleIndex, jid } = router?.query;

  const { journeyData } = useFetchJourneys();
  const { journeyDetail, refetch } = useFetchJourney(jid);
  const isFetching = useIsFetching();

  const isSpecialJourney = useSpecialJourneys(journeyDetail);
  const realEstateSubHeading = useSpecialHeading(journeyDetail);
  const handleExternalLink = useSpcialLinks(journeyDetail);
  const { floatingNav, floatingNavClasses } = useFloatingNav();

  const handleBack = () => {
    router.push({
      pathname: `/journey/${jid}`,
    });
  };

  const renderContent = useMemo(() => {
    if (moduleIndex === '1') {
      return (
        <FoundationModules
          layout='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          showHeading={false}
          journeyData={journeyDetail?.data}
        />
      );
    }

    if (moduleIndex === '2') {
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
    }

    if (moduleIndex === '3') {
      return (
        <ExperienceModules
          showHeading={false}
          coreModules={journeyDetail.data.experiences}
          specialModules={journeyDetail.data.student_clubs}
        />
      );
    }
  }, [
    moduleIndex,
    journeyDetail,
    handleExternalLink,
    isSpecialJourney,
    realEstateSubHeading,
  ]);

  const renderHeading = useMemo(() => {
    const sectionIndex = moduleIndex - 1;

    return journeyDetail?.data.general.sections[sectionIndex].title;
  }, [journeyDetail, moduleIndex]);

  const switchPersona = (item) => {
    console.log('item >>>', item);
    console.log('moduleIndex >>>', moduleIndex);

    router.push({
      pathname: `/recommended/${item.jID}/${moduleIndex}`,
    });

    setTimeout(() => {
      refetch();
    }, 100);
  };

  if (isFetching) return <LoadingScreen />;

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

      <figure ref={floatingNav} className={`${floatingNavClasses}`}>
        <div className='md:px-7 flex items-center mb-5 space-x-4 max-w-1456 mx-auto'>
          <span
            onClick={handleBack}
            className='flex items-end space-x-4 cursor-pointer'
          >
            <BackIcon />
            <span className='text-xl'>Back to journey overview</span>
          </span>
        </div>
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

      <div className='md:px-7'>{renderContent}</div>

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

// export async function getStaticProps({ params }) {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery('journeyDetail', () =>
//     useFetchJourney(params.jid)
//   );
//   await queryClient.prefetchQuery('journeys', getJourney);

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

// export async function getStaticPaths() {
//   const resJourneys = await getJourney();

//   const moduleIndexNumbers = [1, 2, 3];

//   const paths = moduleIndexNumbers
//     .map((key) => {
//       return resJourneys?.data?.journeys?.map((item) => ({
//         params: { jid: String(item.jID), moduleIndex: String(key) },
//       }));
//     })
//     .flat();

//   return { paths, fallback: false };
// }
