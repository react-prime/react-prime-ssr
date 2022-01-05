import * as i from 'types';
import * as React from 'react';
import type { GetServerSideProps } from 'next';
import Image from 'next/image';


import { PrimeHeader, PrimeContent } from 'modules/Home/styled';
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
        <Image src="/vectors/logo.svg" width={250} height={102.3} alt="Prime logo" priority />
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
