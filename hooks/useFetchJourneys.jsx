import { getJourney } from "@/api";
import { useQuery } from "react-query";

export const useFetchJourneys = () => {
  const { data: journeyData } = useQuery("journey", getJourney);

  return {
    journeyData,
  };
};
