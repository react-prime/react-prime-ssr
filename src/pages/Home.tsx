import * as i from 'types';
import React from 'react';

import { Anchor } from 'common';

const Home: i.NextPageComponent = () => {
  return (
    <p><Anchor to="/data">Data Page</Anchor></p>
  );
};

export default Home;
