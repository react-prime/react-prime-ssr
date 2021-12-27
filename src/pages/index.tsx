import * as React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Image from 'next/image';

import Logo from 'vectors/logo.svg';

import { Anchor } from 'common';
import { PrimeHeader, PrimeContent, GithubLink } from 'modules/Home/styled';

const Home = React.lazy(() => import('./Home'));
const Data = React.lazy(() => import('./Data'));

const Component: React.VFC = () => {
  return (
    <BrowserRouter>
      <main>
        <PrimeHeader>
          <Logo />
        </PrimeHeader>

        <PrimeContent>
          <React.Suspense fallback={<span>loading component...</span>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/data" element={<Data />} />
            </Routes>
          </React.Suspense>

          <p>
            Created by
            <Anchor as="a" href="https://github.com/sandervspl"> @sandervspl </Anchor>
            and maintained by
            <Anchor as="a" href="https://labela.nl/"> LabelA</Anchor>
          </p>

          <GithubLink as="a" href="https://github.com/react-prime/react-prime-ssr">
            <Image src="/images/github-logo.png" width={128} height={128} alt="github" />
          </GithubLink>
        </PrimeContent>
      </main>
    </BrowserRouter>
  );
};

export default Component;
