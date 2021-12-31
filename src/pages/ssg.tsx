import * as i from 'types';
import * as React from 'react';
import type { GetStaticProps } from 'next';

import Logo from 'vectors/logo.svg';
import { serverQueryFetch } from 'services';
import { useGetAllUsersQuery } from 'queries/generated';

import { PrimeHeader, PrimeContent } from 'modules/Home/styled';

/**
 * SSG (static site generation) is like Gatsby: it will generate a static page during build-time
 * and serve the static file on every request.
 * You can tell Next to revalidate this page's data every x seconds in getStaticProps and build an
 * up-to-date page
 * https://www.patterns.dev/posts/static-rendering/
 */
const Page: i.NextPageComponent = () => {
  const { data } = useGetAllUsersQuery();

  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        This page is to show how to use SSG.<br /><br />
        data: <pre>{JSON.stringify(data, null, 2)}</pre>
      </PrimeContent>
    </>
  );
};

/**
 * Get data from the backend during build-time
 */
export const getStaticProps: GetStaticProps = async () => {
  const query = await serverQueryFetch(
    useGetAllUsersQuery.getKey(),
    useGetAllUsersQuery.fetcher(),
  );

  return {
    props: {
      ...query,
    },
    // Revalidate the page's data every 5 minutes
    revalidate: 300,
  };
};

export default Page;
