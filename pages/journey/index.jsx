import BackIcon from '@/components/BackIcon';
import BaseHeader from '@/components/BaseHeader';
import ElectiveModules from '@/components/ElectiveModules';
import ExperienceModules from '@/components/ExperienceModules';
import FoundationModules from '@/components/FoundationModules';
import LoadingScreen from '@/components/LoadingScreen';
import ModulePanel from '@/components/ModulePanel';
import { BUILD_JOURNEY_PAGE, maxSelectElectives } from '../../constant';
import { useFetchJourneyByOptions } from '@/hooks/useFetchJourneyByOptions';
import { useFloatingNav } from '@/hooks/useFloatingNav';
import { useSpcialLinks } from '@/hooks/useSpcialLinks';
import { useSpecialHeading } from '@/hooks/useSpecialHeading';
import { useSpecialJourneys } from '@/hooks/useSpecialJourney';
import {
  setJourneyName,
  setLocationState,
  setSideBarProps,
  toggleIsVisibleSecondModal,
} from '@/store/slices/GlobalSlice';
import { message } from 'antd';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, useHistory, useLocation, useParams } from 'react-router';
import { assetsURL } from '../../api';
import Complete from '../../components/Complete';
import { useRouter } from 'next/router';
import Image from 'next/image';
import StartOverIcon from '../../public/images/start-over.svg';

const borderRightBlue = 'border-r border-solid border-nus-blue-100';

const Journey = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const shouldRedirect = true;
  const router = useRouter();

  console.log('router', router);

  const journeyHash = '';
  // let history = useHistory();
  // let location = useLocation();
  // let { hash: journeyHash } = useParams();
  // const shouldRedirect = !location.state && !!!journeyHash;

  const { timelineView, locationState } = useSelector(
    (state) => state.globalSlice
  );

  const cacheJourneys = queryClient.getQueryData(['journeys']);
  const cacheJourneyOptions = queryClient.getQueryData(['journeyOptionss']);

  const { isFetching, journeyDetail } = useFetchJourneyByOptions({
    shouldRedirect,
    location,
    journeyHash,
  });

  const isSpecialJourney = useSpecialJourneys(journeyDetail);
  const realEstateSubHeading = useSpecialHeading(journeyDetail);
  const handleExternalLink = useSpcialLinks(journeyDetail);
  const { floatingNav, floatingNavClasses } = useFloatingNav();

  const roleName = useMemo(() => {
    return cacheJourneyOptions
      ? cacheJourneyOptions?.data?.roles.filter(
          (item) => item.val === locationState?.locationState?.roles
        )
      : journeyDetail?.data?.header_fields?.roleName;
  }, [cacheJourneyOptions, journeyDetail, locationState]);

  const industryName = useMemo(() => {
    return cacheJourneyOptions
      ? cacheJourneyOptions?.data?.industries.filter(
          (item) => item.val === locationState?.locationState?.industries
        )
      : journeyDetail?.data?.header_fields?.industryName;
  }, [cacheJourneyOptions, journeyDetail, locationState]);

  const currentJourney = useMemo(() => {
    return cacheJourneys && location?.state
      ? cacheJourneys?.data?.journeys.filter(
          (item) => item.jID === parseInt(location?.state?.jID)
        )
      : journeyDetail?.data?.header_fields.currentJourney;
  }, [cacheJourneys, location, journeyDetail]);

  const electivesSelected = useMemo(() => {
    return journeyDetail?.data?.electives.filter((item) => item.selected);
  }, [journeyDetail?.data?.electives]);

  const openSidebar = useCallback(
    (type) => {
      dispatch(
        setSideBarProps({
          visible: true,
          type,
        })
      );
    },

    [dispatch]
  );

  const completeJourneySubmit = useCallback(() => {
    if (electivesSelected.length === maxSelectElectives || isSpecialJourney) {
      dispatch(toggleIsVisibleSecondModal());
      return;
    }

    message.error(`You have to choose 7 electives.`);
  }, [dispatch, electivesSelected, isSpecialJourney]);

  const handleBack = () => {
    history.push({
      pathname: `/`,
    });
  };

  const handleStartOver = () => {
    /**
     * back to Build journey options page if we did choose Create your own journey
     * back to Homepage if we did choose Customise from a journey
     */
    if (location?.state?.fromBuildJourney) {
      router.push({
        pathname: BUILD_JOURNEY_PAGE,
      });
    } else {
      router.push({
        pathname: `/`,
      });
    }
  };

  useEffect(() => {
    dispatch(
      setLocationState({
        currentJourney,
        locationState: location?.state,
      })
    );
  }, []);

  useEffect(() => {
    if (roleName?.length === 0 || industryName?.length === 0) return;

    dispatch(
      setJourneyName({
        roleName,
        industryName,
      })
    );
  }, [roleName, industryName]);

  // if (isFetching) return <LoadingScreen />;

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/');
    }
  }, [shouldRedirect]);

  return (
    <>
      <div className='px-5 md:px-7 pb-10 md:pb-14'>
        <figure
          className={`md:px-7 flex flex-col md:flex-row md:items-center md:justify-between mb-5 md:space-x-4 space-y-4 md:space-y-0`}
        >
          <span
            onClick={handleBack}
            className='flex items-end space-x-3 cursor-pointer'
          >
            <BackIcon />
            <span className='text-xl'>Back to main menu</span>
          </span>

          <div
            className='inline-flex items-end cursor-pointer space-x-3'
            onClick={handleStartOver}
          >
            <Image src={StartOverIcon} alt='icon' width={32} height={32} />
            {/* <img
                className='w-[32px]'
                src={`${assetsURL}/start-over.svg`}
                alt='icon'
              /> */}
            <span className='text-xl'>Start Over</span>
          </div>
        </figure>

        <figure ref={floatingNav} className={`${floatingNavClasses}`}>
          <div className='max-w-1456 mx-auto flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 space-y-4 md:space-y-0 md:px-14'>
            <span
              onClick={handleBack}
              className='flex items-end space-x-3 cursor-pointer'
            >
              <BackIcon />
              <span className='text-xl'>Back to main menu</span>
            </span>

            <div
              className='inline-flex items-end cursor-pointer space-x-3'
              onClick={handleStartOver}
            >
              <Image src={StartOverIcon} alt='icon' width={32} height={32} />

              {/* <img
                  className='w-[32px]'
                  src={`${assetsURL}/start-over.svg`}
                  alt='icon'
                /> */}
              <span className='text-xl'>Start Over</span>
            </div>
          </div>
        </figure>

        <BaseHeader
          locationState={
            location?.state || journeyDetail?.data.header_fields.locationState
          }
          currentJourney={currentJourney}
          roleName={roleName}
          industryName={industryName}
          journeyDetail={journeyDetail}
        />

        <div className={`${timelineView ? '' : 'space-y-9'} mb-9`}>
          {timelineView && (
            <div
              className={`grid grid-cols-2 ${
                timelineView ? 'border-b border-solid border-nus-blue-100' : ''
              }`}
            >
              <div
                className={`${
                  timelineView ? `${borderRightBlue} pb-6 pr-12` : ''
                }`}
              >
                <h2 className='text-xl font-bold text-center'>Year 1</h2>
              </div>
              <div className={`${timelineView ? 'pb-6 pl-12' : ''}`}>
                <h2 className='text-xl font-bold text-center'>Year 2</h2>
              </div>
            </div>
          )}

          <div className={`${timelineView ? 'grid grid-cols-2' : ''}`}>
            <div
              className={`${
                timelineView
                  ? `${borderRightBlue} col-span-1 pr-5 py-6 xl:pr-12 xl:py-14`
                  : ''
              }`}
            >
              <FoundationModules
                journeyData={journeyDetail?.data}
                layout={timelineView ? 'grid xl:grid-cols-2' : ''}
              />
            </div>
            <div className='col-span-1'></div>
          </div>

          <div className={`${timelineView ? 'grid grid-cols-3' : ''}`}>
            <div className='col-span-1'></div>
            <div className='col-span-2'>
              <ElectiveModules
                layout={
                  timelineView
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : ''
                }
                coreModules={journeyDetail?.data?.electives}
                desc={journeyDetail?.data?.general.sections[1].desc}
                title={journeyDetail?.data.general.sections[1].title}
                isCustomizable
              >
                {isSpecialJourney ? (
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
                ) : (
                  <div className='space-y-4'>
                    <p
                      className='text-sm'
                      dangerouslySetInnerHTML={{
                        __html:
                          journeyDetail?.data?.general.sections[1].foot_desc,
                      }}
                    />

                    <div className='grid md:grid-cols-3 xl:grid-cols-4 gap-5'>
                      <ModulePanel
                        onClick={() => openSidebar('electives')}
                        title='Customise Electives'
                        type='custom'
                      />
                    </div>
                  </div>
                )}
                {/* {journeyDetail?.data?.general.type !== 'real-estate' &&
                    journeyDetail?.data?.general.type !== 'healthcare' && (
                      <div className='space-y-4'>
                        <p
                          className='text-sm'
                          dangerouslySetInnerHTML={{
                            __html: journeyDetail?.data?.general.sections[1].foot_desc,
                          }}
                        />

                        <div className='grid md:grid-cols-3 xl:grid-cols-4 gap-5'>
                          <ModulePanel
                            onClick={() => openSidebar('electives')}
                            title='Customise Electives'
                            type='custom'
                          />
                        </div>
                      </div>
                    )} */}
              </ElectiveModules>
            </div>
          </div>

          {timelineView && (
            <div className='grid grid-cols-2'>
              <div className={`h-10 ${borderRightBlue}`}></div>
              <div className='h-10'></div>
            </div>
          )}

          <ExperienceModules
            coreModules={journeyDetail.data.experiences}
            specialModules={journeyDetail.data.student_clubs}
            desc={journeyDetail?.data?.general.sections[2].desc}
            title={journeyDetail?.data?.general.sections[2].title}
          >
            <div className='space-y-4'>
              {!isSpecialJourney && (
                <>
                  <p
                    className='text-sm'
                    dangerouslySetInnerHTML={{
                      __html:
                        journeyDetail?.data?.general.sections[2]?.foot_desc,
                    }}
                  />

                  <div className='grid md:grid-cols-3 xl:grid-cols-4 gap-5'>
                    <ModulePanel
                      onClick={() => openSidebar('experiences')}
                      title='Customise Experience'
                      type='custom'
                    />
                  </div>
                </>
              )}
            </div>
          </ExperienceModules>
        </div>

        <Complete
          onClick={completeJourneySubmit}
          isSpecialJourney={isSpecialJourney}
        />

        <div
          className='text-lg font-semibold mt-5'
          dangerouslySetInnerHTML={{
            __html: journeyDetail?.data?.general.disclaimer_desc,
          }}
        />
      </div>
    </>
  );
};

export default Journey;
