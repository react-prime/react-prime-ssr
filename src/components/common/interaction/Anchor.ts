import styled from 'styled-components';

import { Link } from './Link';

export const Anchor = styled(Link)`
  color: ${(props) => props.theme.color.black};
  text-decoration: none;
  border-bottom: 2px solid ${(props) => props.theme.color.prime};
`;
