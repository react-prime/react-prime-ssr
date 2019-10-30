import * as i from 'types';
import React from 'react';

import Logo from 'vectors/logo.svg';

import { withRedux } from 'services';
import { useSelector } from 'hooks';
import { PrimeHeader, PrimeContent } from 'modules/Home/styled';

const Data: i.NextPageComponent = () => {
  const dataLoading = useSelector((state) => state.data.loading);

  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        This page is to show how to use Redux.
        This page will also NOT be generated as static because of that.
        {dataLoading ? 'loading' : 'not loading'}
      </PrimeContent>
    </>
  );
};

export default withRedux(Data);
