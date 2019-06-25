import React from 'react';
import test from 'services/test';
import LogoIcon from 'vectors/logo.svg';
import githubLogo from 'images/github-logo.png?external';
import { Container } from 'modules/test';
import { Button } from 'common/interaction';

const Home = () => (
  <Container>
    <LogoIcon />
    <img src={githubLogo} />
    {test()}
    <Button>Click me</Button>
  </Container>
);

export default Home;
