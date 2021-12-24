import * as i from 'types';
import { useMutation, useQueryClient, useQuery, UseQueryResult, QueryClient } from 'react-query';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: i.DataPayload) => await new Promise<i.Data>((resolve) => {
      setTimeout(() => {
        resolve({
          id: '3783ce59-0e59-4a77-aaaf-e824f7c5e8f1',
          ...data,
        });
      }, 1000);
    }),
    {
      onSuccess: (data: i.Data) => {
        queryClient.invalidateQueries(['user', data.id]);
        queryClient.setQueryData(['user', data.id], data);
      },
    },
  );
};

export const fetchUser = (userId: string) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: 'John Doe',
      });
    }, 1000);
  })
);

export const useGetUser = (userId: string): UseQueryResult<i.Data | undefined> => {
  const queryClient = new QueryClient();

  return useQuery(
    ['user', userId],
    async () => await fetchUser(userId),
    {
      enabled: Boolean(userId),
      initialData: queryClient.getQueryData(['user', userId]),
    },
  );
};
