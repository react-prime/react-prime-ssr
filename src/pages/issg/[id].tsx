import * as i from 'types';
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import Logo from 'vectors/logo.svg';

import { PrimeHeader, PrimeContent } from 'modules/Home/styled';


/**
 * iSSG (incremental static site generation) is a mix of SSG and SSR
 * You can specify the known paths during build-time, and any new paths will be built on the server
 * and live as static paths from there on
 *
 * https://www.patterns.dev/posts/incremental-static-rendering/
 */
const Page: i.NextPageComponent<PageProps, PageQueries> = ({ params }) => {
  const router = useRouter();

  // Show a loader while the page is being built and rendered
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
export const getStaticProps: GetStaticProps<PageProps, PageQueries> = async (ctx) => {
  return {
    props: {
      params: ctx.params!,
    },
    // Revalidate the page's data every 5 minutes
    revalidate: 300,
  };
};

type PageProps = {
  params: PageQueries;
};

type PageQueries = {
  id: string;
};

export default Page;
