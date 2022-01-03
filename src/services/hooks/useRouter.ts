import * as i from 'types';
import { useRouter as useNextRouter } from 'next/router';

export function useRouter<Queries extends i.AnyObject>() {
  const { query, ...router } = useNextRouter();

  return {
    ...router,
    query: query as Queries,
  };
}
