import * as i from 'types';
import * as React from 'react';
import Image from 'next/image';

import Logo from 'vectors/logo.svg';

import { Anchor } from 'common';
import { PrimeHeader, PrimeContent, GithubLink } from 'modules/Home/styled';

const userId = '3783ce59-0e59-4a77-aaaf-e824f7c5e8f1';

const Home: i.NextPageComponent = () => {
  const [randomNum, setRandomNum] = React.useState<number | null>(null);

  React.useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 1000));
  }, []);

  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        <ul>
          <li><Anchor to={`/ssr/${userId}`}>SSR Page</Anchor></li>
          <li><Anchor to="/ssg">SSG Page</Anchor></li>
          <li><Anchor to="/issg/1">iSSG (build-time) Page</Anchor></li>
          <li><Anchor to={`/issg/${randomNum}`}>iSSG (run-time) Page</Anchor></li>
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
