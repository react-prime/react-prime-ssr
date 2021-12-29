import * as i from 'types';
import { dehydrate, QueryClient, QueryKey } from 'react-query';

export const serverQueryFetch = async <Fn extends i.AnyFn>(key: QueryKey, fetchFn: Fn) => {
  // Create a new QueryClient instance for each page request.
  // This ensures that data is not shared between users and requests.
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(key, fetchFn);

  return {
    dehydratedState: dehydrate(queryClient),
  };
};
