import * as i from 'types';
import React from 'react';

import Logo from 'vectors/logo.svg';

import { getData } from 'ducks/test';
import { useSelector } from 'hooks';
import { PrimeHeader, PrimeContent } from 'modules/Home/styled';
import { wrapper } from 'store';

/**
 * The first parameter of this type is the component props type
 * The second parameter is for typing URL queries
 */
const Data: i.NextPageComponent<DataProps, DataQueries> = ({ query }) => {
  const data = useSelector((state) => state.test);

  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        This page is to show how to use Redux.<br /><br />
        data: <pre>{JSON.stringify(data, null, 2)}</pre>
        queries: <pre>{JSON.stringify(query)}</pre>
      </PrimeContent>
    </>
  );
};

// Return a getServerSideProps function instead of using Data.getInitialProps
// See: https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {
  await store.dispatch(getData());

  return {
    props: {
      query,
    },
  };
});

type DataProps = {
  query: DataQueries;
};

type DataQueries = {
  page?: number;
};

export default Data;
