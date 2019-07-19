import styled from 'styled-components';

export const SideNavContainer = styled.section`
  background: #f9fafc;
  width: 320px;
  height: 100%;
  position: absolute;
  z-index: 2000;
  & .rootLink {
    text-decoration: none;
  }
  transition: margin-left 250ms ease-in;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;