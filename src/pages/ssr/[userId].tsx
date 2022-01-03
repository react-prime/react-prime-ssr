import * as i from 'types';
import * as React from 'react';

import Logo from 'vectors/logo.svg';

import { PrimeHeader, PrimeContent } from 'modules/Home/styled';
import { GetServerSideProps } from 'next';
import { useRouter } from 'services/hooks/useRouter';
import { serverQueryFetch } from 'services';
import { useGetUserQuery } from 'queries/generated';

/**
 * SSR (server site rendering) dynamically renders the page on every request
 * https://www.patterns.dev/posts/server-side-rendering/
 */
const Page: i.NextPageComponent<PageProps, PageQueries> = () => {
  const router = useRouter<PageQueries>();
  const { data } = useGetUserQuery({ id: router.query.userId });

  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        This page is to show how to use SSR.<br /><br />
        data: <pre>{JSON.stringify(data, null, 2)}</pre>
      </PrimeContent>
    </>
  );
};

// NOTE: This function will make this path non-static. For static, use "GetStaticProps"
export const getServerSideProps: GetServerSideProps<PageProps, PageQueries> = async (ctx) => {
  const query = await serverQueryFetch(
    useGetUserQuery.getKey({ id: ctx.params!.userId! }),
    useGetUserQuery.fetcher({ id: ctx.params!.userId! }),
  );

  return {
    props: {
      ...query,
    },
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
type PageProps = {};

type PageQueries = {
  userId: string;
};

export default Page;
