import styled from "styled-components";

const StyledNavbar = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  font-size: 2rem;
  justify-self: end;
  button,
  a {
    display: flex;
    align-items: center;
    position: relative;
    background: none;
    border: 0;
    cursor: pointer;
    padding: 1rem 3rem;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1em;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    &:before {
      content: "";
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
      width: 2px;
      left: 0;
      background-color: lightgray;
      height: 100%;
    }
    &:after {
      height: 2px;
      background: ${props => props.theme.primary};
      content: "";
      width: 0;
      position: absolute;
      /* Transition: Translate 0.4 seconds */
      transform: translate(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
    }
  }
  @media (max-width: 1200px) {
    width: 100%;
    font-size: 1.5rem;
    justify-content: center;
    border-top: 1px solid lightgray;
  }
`;

export default StyledNavbar;
