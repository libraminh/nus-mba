import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useFetchCondition = (qKey, queryFunc) => {
  console.log('qKey, queryFunc', { qKey, queryFunc });
  const queryClient = useQueryClient();

  const cacheData = queryClient.getQueryData(qKey) || {};

  console.log('cacheData', cacheData);

  const { data, ...params } = useQuery(qKey, () => queryFunc(), {
    enabled: true,
  });

  console.log('data >>>', data);

  return {
    data: cacheData || data,
    ...params,
  };
};
