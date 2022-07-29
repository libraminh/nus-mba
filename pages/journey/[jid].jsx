import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getJourney, getJourneyOptions } from '../../api';
import BackIcon from '../../components/BackIcon';
import BtnArrow from '../../components/BtnArrow';
import SwitchPersona from '../../components/SwitchPersona';
import { useFetchJourney } from '../../hooks/useFetchJourney';
import { useFloatingNav } from '../../hooks/useFloatingNav';

const JourneyDetail = () => {
  const router = useRouter();

  const { jid } = router?.query;

  const { journeyDetail, refetch } = useFetchJourney(jid);
  const { floatingNav, floatingNavClasses } = useFloatingNav();

  const { data } = useQuery(['journeys'], getJourney);

  const handleBack = () => {
    router.push('/');
  };

  const handleRecommendedDetail = (index, item) => {
    router.push(`/recommended/${jid}/${index + 1}`);
  };

  const switchPersona = (item) => {
    router.push({
      pathname: `/journey/${item.jID}`,
    });

    setTimeout(() => {
      refetch();
    }, 100);
  };

  return (
    <section className='relative'>
      {/* grid md:grid-cols-3 gap-5  */}
      <div className='space-y-5 px-7 mb-20'>
        <figure
          ref={floatingNav}
          className={`${floatingNavClasses}`}
          onClick={handleBack}
        >
          <div className='flex items-end cursor-pointer space-x-4 max-w-1456 mx-auto md:px-7'>
            <BackIcon />
            <span className='text-xl'>View all journeys</span>
          </div>
        </figure>

        <figure
          className='flex items-end cursor-pointer space-x-4'
          onClick={handleBack}
        >
          <BackIcon />
          <span className='text-xl'>View all journeys</span>
        </figure>

        <SwitchPersona handleOnClick={switchPersona} jID={jid} layout={''} />
      </div>

      <div className='md:px-7 space-y-10'>
        <div className='text-lg md:text-2xl font-bold text-center px-10'>
          Click the boxes below to browse your selected journey.
        </div>

        <div className='space-y-7 px-7 py-9 md:rounded-xl bg-nus-gray-200'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
            {journeyDetail.data.general.sections?.map((item, index) => (
              <figure
                key={index}
                className={`rounded-xl bg-white p-4 min-w-220 md:min-w-0 shadow-lg`}
              >
                <div className='flex justify-between space-x-2 h-full'>
                  <figure className='flex-1'>
                    <span
                      className={`inline-block text-base md:text-lg leading-snug font-bold text-nus-black-200 mb-2`}
                    >
                      {item.title}
                    </span>

                    <div
                      className='text-sm md:text-base'
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                  </figure>

                  <BtnArrow
                    onClick={() => handleRecommendedDetail(index, item)}
                    className='self-end'
                    theme='white'
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyDetail;

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

  const paths = resJourneys?.data?.journeys.map((item) => ({
    params: { jid: item.jID.toString() },
  }));

  return { paths, fallback: false };
}
