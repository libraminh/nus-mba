import { useMemo } from "react";

export const useSpecialJourneys = (journeyDetail) => {
  return useMemo(
    () =>
      journeyDetail?.data?.general?.type === "real-estate" ||
      journeyDetail?.data?.general?.type === "healthcare",
    [journeyDetail]
  );
};
