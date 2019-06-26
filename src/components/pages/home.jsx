import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';

import LogoIcon from 'vectors/logo.svg';
import githubLogo from 'images/github-logo.png';

import { getData } from 'ducks/data';

import { Container } from 'modules/test';
import { Button } from 'common/interaction';

const Home = (props) => (
  <Container>
    <LogoIcon />
    <img src={githubLogo} alt="github logo" />
    <Button onClick={props.getData}>Click me</Button>
  </Container>
);

Home.propTypes = {
  getData: PT.func,
};

export default connect(null, { getData })(Home);
