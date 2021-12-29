import * as i from 'types';
import React from 'react';
import type { GetStaticProps } from 'next';

import Logo from 'vectors/logo.svg';
import { fetchUser, useGetUser } from 'queries/example';
import { serverQueryFetch } from 'services';

import { PrimeHeader, PrimeContent } from 'modules/Home/styled';

const userId = '3783ce59-0e59-4a77-aaaf-e824f7c5e8f1';

/**
 * SSG (static site generation) is like Gatsby: it will generate a static page during build-time
 * and serve the static file on every request.
 * You can tell Next to revalidate this page's data every x seconds in getStaticProps and build an
 * up-to-date page
 * https://www.patterns.dev/posts/static-rendering/
 */
const Page: i.NextPageComponent = () => {
  const { data } = useGetUser(userId);

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
  const query = serverQueryFetch(
    ['user', userId],
    () => fetchUser(userId),
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
