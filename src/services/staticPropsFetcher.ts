import { dehydrate, QueryClient } from 'react-query';

export const staticPropsFetcher = async <Fn extends (...args: unknown[]) => unknown>(
  key: string | (string | number)[],
  fetchFunc: Fn,
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(key, fetchFunc);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
