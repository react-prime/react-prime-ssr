import React from 'react';
import test from 'services/test';
import { Container } from 'modules/test';
import { Button } from 'common/interaction';

const Home = () => (
  <Container>
    {test()}
    <Button>Click me</Button>
  </Container>
);

export default Home;
