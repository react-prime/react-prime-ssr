import { dehydrate, QueryClient } from 'react-query';

export const serverQueryFetch = async <Fn extends (...args: unknown[]) => unknown>(
  key: string | (string | number)[],
  fetchFunc: Fn,
) => {
  // Create a new QueryClient instance for each page request.
  // This ensures that data is not shared between users and requests.
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(key, fetchFunc);

  return {
    dehydratedState: dehydrate(queryClient),
  };
};
