import * as i from 'types';
import React from 'react';
import Image from 'next/image';

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
        <ul>
          <li><Anchor to="/ssr">SSR Page</Anchor></li>
          <li><Anchor to="/ssg">SSG Page</Anchor></li>
          <li><Anchor to="/issg/1">iSSG (build-time) Page</Anchor></li>
          <li><Anchor to={`/issg/${Math.floor(Math.random() * 1000)}`}>iSSG (run-time) Page</Anchor></li>
        </ul>
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
