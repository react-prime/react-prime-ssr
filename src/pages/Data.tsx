import * as i from 'types';
import React from 'react';
import Image from 'next/image';
import { useQuery } from 'react-query';

import Logo from 'vectors/logo.svg';

import { Anchor } from 'common';
import { PrimeHeader, PrimeContent, GithubLink } from 'modules/Home/styled';

const Data: i.NextPageComponent = () => {
  const { data, isLoading } = useQuery<i.AnyObject>('data', () => new Promise((res) => {
    setTimeout(() => res({ hello: 'world' }), 1000);
  }));

  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        <p>
          <Anchor to="/">Home Page</Anchor>
        </p>
        <p>
          {isLoading ? 'Fetching...' : JSON.stringify(data, null, 2)}
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

export default Data;
