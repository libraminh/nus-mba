import { useMemo } from 'react';

export const useSpecialHeading = (journeyDetail) => {
  const journeyType = journeyDetail?.data?.general?.type;

  return useMemo(() => {
    let text = '';

    if (journeyType === 'real-estate') {
      text = 'Explore more Real Estate specialisation electives';
    }
    if (journeyType === 'healthcare') {
      text = 'Explore more Healthcare specialisation electives';
    }

    return text;
  }, [journeyType]);
};
