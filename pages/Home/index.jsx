import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import NusMasthead from '../../components/NusMasthead';
import LoadingScreen from '../../components/LoadingScreen';
import { getJourney } from '../../utils/api';

const HomePage = () => {
  const { data: journeyData, isLoading } = useQuery(['journeys'], getJourney);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <NusMasthead headingContent={journeyData?.data.general} />
    </>
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
