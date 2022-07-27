import { useCallback } from 'react';

export const useSpcialLinks = (journeyDetail) => {
  const journeyType = journeyDetail?.data?.general?.type;

  return useCallback(() => {
    const reLink = 'https://mscre.nus.edu.sg/academics/programme-structure-and-curriculum';
    const hcmLInk = 'https://sph.nus.edu.sg/education/mph/curriculum/';

    const url = journeyType === 'real-estate' ? reLink : hcmLInk;

    window.open(url, '_blank');
  }, [journeyType]);
};
