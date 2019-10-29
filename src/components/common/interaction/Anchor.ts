import styled from 'styled-components';

const Anchor = styled.a.attrs(() => ({
  target: '_blank',
  rel: 'noopener noreferrer',
}))`
  color: ${(props) => props.theme.color.black};
  text-decoration: none;
  border-bottom: 2px solid ${(props) => props.theme.color.prime};
`;

export default Anchor;
