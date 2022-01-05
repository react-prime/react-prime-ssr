import * as i from 'types';
import * as React from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import { serverQueryFetch } from 'services';
import { useRouter } from 'services/hooks/useRouter';
import { useGetUserQuery, useGetUserIdsQuery } from 'queries/generated';

import { PrimeHeader, PrimeContent } from 'modules/Home/styled';


/**
 * iSSG (incremental static site generation) is a mix of SSG and SSR
 * You can specify the known paths during build-time, and any new paths will be built on the server
 * and live as static paths from there on
 *
 * https://www.patterns.dev/posts/incremental-static-rendering/
 */
const Page: i.NextPageComponent<PageProps, PageQueries> = () => {
  const router = useRouter<PageQueries>();
  const { data: user, isLoading } = useGetUserQuery({ id: router.query.id });

  return (
    <>
      <PrimeHeader>
        <Image src="/vectors/logo.svg" width={250} height={102.3} alt="Prime logo" priority />
      </PrimeHeader>
      <PrimeContent>
        This page is to show how to use iSSG.<br /><br />
        {router.isFallback || isLoading ? <div>Loading...</div> : (
          <>user: <pre>{JSON.stringify(user, null, 2)}</pre></>
        )}
      </PrimeContent>
    </>
  );
};


/**
 * Generate all the (known) static paths for this route during build-time
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const query = await useGetUserIdsQuery.fetcher()();
  const users = query.userCollection?.items.filter((item) => item != null) || [];

  return {
    paths: users.map((user) => ({
      params: { id: user!.sys.id },
    })),
    fallback: true,
  };
};


/**
 * Get data from the backend during build-time
 */
export const getStaticProps: GetStaticProps<PageProps, PageQueries> = async (ctx) => {
  const query = await serverQueryFetch(
    useGetUserQuery.getKey({ id: ctx.params!.id! }),
    useGetUserQuery.fetcher({ id: ctx.params!.id! }),
  );

  return {
    props: {
      ...query,
    },
    // Revalidate the page's data every 5 minutes
    revalidate: 300,
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
type PageProps = {};

type PageQueries = {
  id: string;
};

export default Page;
