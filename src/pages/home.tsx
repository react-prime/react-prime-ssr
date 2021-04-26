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
          Created by
          <Anchor external to="https://github.com/sandervspl"> @sandervspl </Anchor>
          and maintained by
          <Anchor external to="https://labela.nl/"> LabelA</Anchor>
        </p>
        <GithubLink
          href="https://github.com/react-prime/react-prime-ssr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={GithubLogo} alt="github" />
        </GithubLink>
      </PrimeContent>
    </>
  );
};

export default Home;
