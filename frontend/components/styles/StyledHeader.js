import styled from "styled-components";

const StyledTitle = styled.h1`
  font-size: 4rem;
  display: inline-block;
  margin: 0.5rem;
  z-index: 10;
  a {
    padding: 0.4rem 0.6rem;
    border-radius: 3px;
    background: ${props => props.theme.bt_red};
    text-transform: uppercase;
    color: ${props => props.theme.whiteText} !important;
    text-decoration: none;
  }

`;

const StyledHeader = styled.header`
  .navbar {
    margin: 0 auto;
    padding: 0.5rem;
    position: relative;
  }
  .sub-navbar {
    display: grid;
    grid-template-columns: 1fr auto;
  }
`;

export {
    StyledTitle,
    StyledHeader
  };
  