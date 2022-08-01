import { useQuery } from '@tanstack/react-query';
import { getJourney } from '../api';

export const useFetchJourneys = () => {
  const { data: journeyData } = useQuery(['journeys'], getJourney);

  return {
    journeyData,
  };
};
