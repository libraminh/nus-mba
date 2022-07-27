import { fetchJourneyDetailByOptions } from "@/api";
import { useQuery } from "react-query";

export const useFetchJourneyByOptions = ({
  shouldRedirect,
  location,
  journeyHash,
}) => {
  const { isFetching, data: journeyDetail } = useQuery(
    "journeyDetail",
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
