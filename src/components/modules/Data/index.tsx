import * as i from 'types';
import React from 'react';
import { useQuery } from 'react-query';

import { Anchor } from 'common';

const Data: i.NextPageComponent = () => {
  const { data, isLoading } = useQuery<i.AnyObject>('data', () => new Promise((res) => {
    setTimeout(() => res({ hello: 'world' }), 1000);
  }));

  return (
    <>
      <p><Anchor to="/">Home Page</Anchor></p>
      <p>{isLoading ? 'Fetching...' : JSON.stringify(data, null, 2)}</p>
    </>
  );
};

export default Data;
