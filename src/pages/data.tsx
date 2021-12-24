import * as i from 'types';
import React from 'react';
import { DehydratedState } from 'react-query';

import Logo from 'vectors/logo.svg';
import { fetchUser, useGetUser } from 'queries/example';
import { staticPropsFetcher } from 'services';
import { PrimeHeader, PrimeContent } from 'modules/Home/styled';

const userId = '3783ce59-0e59-4a77-aaaf-e824f7c5e8f1';

const Data: i.NextPageComponent<DehydratedState> = () => {
  const { data } = useGetUser(userId);

  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        This page is to show how to use React Query.<br /><br />
        data: <pre>{JSON.stringify(data, null, 2)}</pre>
      </PrimeContent>
    </>
  );
};

// Return a getServerSideProps function instead of using Data.getInitialProps
// See: https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
export async function getStaticProps() {
  return staticPropsFetcher<() => void>(
    ['user', 'user_id'], () => fetchUser(userId),
  );
}

export default Data;
