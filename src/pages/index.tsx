import * as i from 'types';
import React from 'react';

import Logo from 'vectors/logo.svg';
import GithubLogo from 'images/github-logo.png';

import { Anchor } from 'common';
import { PrimeHeader, PrimeContent, GithubLink } from 'modules/Home/styled';

const Home: i.NextPageComponent = () => {
  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        <p>
          <Anchor to="/data">Data Page</Anchor>
        </p>
        <p>
          Created by
          <Anchor to="https://github.com/sandervspl"> @sandervspl </Anchor>
          and maintained by
          <Anchor to="https://labela.nl/"> LabelA</Anchor>
        </p>
        <GithubLink to="https://github.com/react-prime/react-prime-ssr">
          <img src={GithubLogo} alt="github" />
        </GithubLink>
      </PrimeContent>
    </>
  );
};

export default Home;
