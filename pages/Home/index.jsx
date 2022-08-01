import { dehydrate, QueryClient } from '@tanstack/react-query';

import HomeMBARecommended from '../../components/HomeMBARecommended';
import NusMasthead from '../../components/NusMasthead';
import { useFetchJourneys } from '../../hooks/useFetchJourneys';
import { getJourney } from '../../utils/api';

const HomePage = () => {
  const { journeyData } = useFetchJourneys();

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
