import { dehydrate, QueryClient } from 'react-query';

export const staticPropsFetcher = async (
  key: string | (string | number)[],
  fetchFunc: () => void,
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(key, fetchFunc);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
