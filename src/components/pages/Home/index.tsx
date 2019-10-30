import React from 'react';

import Logo from 'vectors/logo.svg';
import GithubLogo from 'images/github-logo.png';

import { useSelector } from 'hooks';
import { Anchor } from 'common';
import { PrimeHeader, PrimeContent, GithubLink } from './components/styled';

const Prime = () => {
  const dataLoading = useSelector((state) => state.data.loading);

  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        {dataLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <p>
              Created by
              <Anchor external to="https://github.com/JBostelaar"> @JBostelaar </Anchor>
              and maintained by
              <Anchor external to="https://labela.nl/"> LabelA</Anchor>
            </p>
            <GithubLink
              href="https://github.com/JBostelaar/react-prime"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={GithubLogo} alt="github" />
            </GithubLink>
          </>
        )}
      </PrimeContent>
    </>
  );
};

export default Prime;
