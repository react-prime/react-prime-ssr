import * as i from 'types';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import Image from 'next/image';

import Logo from 'vectors/logo.svg';
import { fetchUser } from 'queries/example';
import { Anchor } from 'common';
import { PrimeHeader, PrimeContent, GithubLink } from 'modules/Home/styled';

const Home: i.NextPageComponent = ({ dehydratedState }) => {
  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        <p>
          <Anchor to="/data">Data Page</Anchor><br />
          {dehydratedState.queries[0].state.status === 'success' ? 'Data loaded' : 'Data loading'}
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

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['user', 'user_id'], () => fetchUser());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
