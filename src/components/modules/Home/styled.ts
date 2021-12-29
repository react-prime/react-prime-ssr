import styled from 'styled-components';

import { Link } from 'common';

export const PrimeHeader = styled.header`
  text-align: center;
  padding: 50px 10px;
  margin: 0 0 50px;
  background: ${(props) => props.theme.colors.black};
  background-image: url(/images/github-logo.png);

  & > svg {
    width: 250px;
  }
`;

export const PrimeContent = styled.section`
  text-align: center;
  padding: 0 10px;
  line-height: 25px;

  li {
    display: inline-block;
    padding-left: 10px;
    list-style: none;

    &:not(:last-child) {
      padding-right: 10px;
      border-right: 1px solid grey;
    }
  }
`;

export const GithubLink = styled(Link)`
  width: 20px;
  height: 20px;
  display: inline-block;

  & > img {
    width: 100%;
  }
`;
