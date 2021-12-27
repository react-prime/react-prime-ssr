import * as i from 'types';
import React from 'react';
import Image from 'next/image';
import { Link } from 'react-router-dom';

import Logo from 'vectors/logo.svg';

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
          <Link to="/data">Data Page</Link>
        </p>
        <p>
          Created by
          <Anchor to="https://github.com/sandervspl"> @sandervspl </Anchor>
          and maintained by
          <Anchor to="https://labela.nl/"> LabelA</Anchor>
        </p>
        <GithubLink to="https://github.com/react-prime/react-prime-ssr">
          <Image src="/images/github-logo.png" width={128} height={128} alt="github" />
        </GithubLink>
      </PrimeContent>
    </>
  );
};

export default Home;
