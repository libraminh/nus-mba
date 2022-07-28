import { useQuery } from '@tanstack/react-query';
import { fetchJourneyDetailByOptions } from '../api';

export const useFetchJourneyByOptions = ({
  shouldRedirect,
  location,
  journeyHash,
}) => {
  const { isFetching, data: journeyDetail } = useQuery(
    ['journeyDetail'],
    async () => {
      return await fetchJourneyDetailByOptions({
        shouldRedirect,
        location,
        journeyHash,
      });
    }
  );

  return {
    isFetching,
    journeyDetail,
  };
};
