import * as i from 'types';
import * as React from 'react';
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
          <li><Anchor to="/ssr/1rCyFsX3xKMEufbh0GgrtZ">SSR Page</Anchor></li>
          <li><Anchor to="/ssg">SSG Page</Anchor></li>
          <li><Anchor to="/issg/1rCyFsX3xKMEufbh0GgrtZ">iSSG (build-time) Page</Anchor></li>
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
