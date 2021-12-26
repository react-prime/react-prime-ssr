import * as i from 'types';
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import Logo from 'vectors/logo.svg';

import { getData } from 'ducks/test';
import { useSelector } from 'hooks';
import { PrimeHeader, PrimeContent } from 'modules/Home/styled';
import { wrapper } from 'store';


/**
 * iSSG (incremental static site generation) is a mix between SSG and SSR
 * You can specify the known paths during build-time, and any new paths will be rendered on the server
 * and live as static paths from there on
 *
 * https://www.patterns.dev/posts/incremental-static-rendering/
 */
const Page: i.NextPageComponent<PageProps, PageParams> = ({ params }) => {
  const data = useSelector((state) => state.test);
  const router = useRouter();

  // Show a loader while the page is being rendered
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        This page is to show how to use iSSG.<br /><br />
        data: <pre>{JSON.stringify(data, null, 2)}</pre>
        params: <pre>{JSON.stringify(params)}</pre>
      </PrimeContent>
    </>
  );
};


/**
 * Generate all the (known) static paths for this route during build-time
 */
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],
    // If a path is loaded that is not /1 or /2 (i.e. /3) then it will be built run-time
    // and from there on it will be a static page like /1 and /2
    fallback: true,
  };
};


/**
 * Get data from the backend during build-time
 */
export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  await store.dispatch(getData());

  return {
    props: {
      params: ctx.params || {},
    },
    // Revalidate the page's data every 60 seconds
    revalidate: 60,
  };
});

type PageProps = {
  params?: PageParams;
};

type PageParams = {
  id: number;
};

export default Page;
