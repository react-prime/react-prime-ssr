import * as i from 'types';
import React from 'react';

import Logo from 'vectors/logo.svg';

import { withRedux } from 'services';
import { useSelector } from 'hooks';
import { PrimeHeader, PrimeContent } from 'modules/Home/styled';

/**
 * Make sure to use the NextPageReduxComponent type instead of NextPageComponent type
 * When you use withRedux()
 * The first parameter of this type is the component props type
 * The second parameter is for typing URL queries
 */
const Data: i.NextPageReduxComponent<DataProps, DataQueries> = ({ data, query }) => {
  const dataLoading = useSelector((state) => state.data.loading);

  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        This page is to show how to use Redux.<br />
        This page will also NOT be generated as static because of that<br />
        queries: {JSON.stringify(query)}
      </PrimeContent>
    </>
  );
};

/**
 * Queries from the URL are available here
 * When using withRedux(), the Redux store is available on server side for dispatch and getState()
 */
Data.getInitialProps = ({ store, query }) => {
  return {
    data: store.getState().data,
    query,
  };
};

type DataProps = {
  data: i.DataState;
  query: DataQueries;
}

type DataQueries = {
  page?: number;
}

export default withRedux(Data);
