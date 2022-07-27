import { useQuery } from '@tanstack/react-query';
import { getJourneyDetail } from '../api';

export const useFetchJourney = (jID) => {
  const {
    isFetching,
    isLoading,
    data: journeyDetail,
    refetch,
  } = useQuery(['journeyDetail'], () => {
    return getJourneyDetail(jID);
  });

  return {
    journeyDetail,
    isFetching,
    isLoading,
    refetch,
  };
};
