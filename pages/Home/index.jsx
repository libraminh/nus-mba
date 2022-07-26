import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import NusMasthead from '../../components/NusMasthead';
import LoadingScreen from '../../components/LoadingScreen';
import { getJourney } from '../../utils/api';

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('journeys', getJourney);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const HomePage = () => {
  const { data: journeyData, isLoading } = useQuery(['journeys'], getJourney);

  if (isLoading) return <LoadingScreen />;

  return (
    <div>
      <NusMasthead headingContent={journeyData?.data.general} />
    </div>
  );
};

export default HomePage;
