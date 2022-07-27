import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import NusMasthead from '../../components/NusMasthead';
import { getJourney } from '../../utils/api';
import HomeMBARecommended from '../../components/HomeMBARecommended';

const HomePage = () => {
  const { data: journeyData } = useQuery(['journeys'], getJourney);

  return (
    <div className='homepage space-y-9'>
      <NusMasthead headingContent={journeyData?.data.general} />
      <HomeMBARecommended journeys={journeyData?.data.journeys} />
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('journeys', getJourney);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
