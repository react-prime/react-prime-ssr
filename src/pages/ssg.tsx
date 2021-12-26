import * as i from 'types';
import React from 'react';

import Logo from 'vectors/logo.svg';

import { getData } from 'ducks/test';
import { useSelector } from 'hooks';
import { PrimeHeader, PrimeContent } from 'modules/Home/styled';
import { wrapper } from 'store';


/**
 * SSG (static site generation) is like Gatsby, it will generate a static page during build-time
 *
 * https://www.patterns.dev/posts/static-rendering/
 */
const Page: i.NextPageComponent<PageProps> = () => {
  const data = useSelector((state) => state.test);

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
export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  await store.dispatch(getData());

  return {
    props: {},
    // Revalidate the page's data every 60 seconds
    revalidate: 60,
  };
});

type PageProps = unknown;

export default Page;
