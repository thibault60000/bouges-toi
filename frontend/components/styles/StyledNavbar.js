import styled from "styled-components";

const StyledNavbar = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  font-size: 1.7rem;
  justify-self: end;
  padding: 3.3rem 0;
  margin-right: 2rem;
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
    :hover {
      color: #ff460f;
    }
    @media (max-width: 700px) {
      font-size: 1.5rem;
      padding: 0 10px;
    }
    &.authentication,
    &.authentication {
      background-color: #ff460f;
      color: white;
      border-radius: 2.4rem;
      margin: 0 0.5rem;
      :hover {
        opacity: 0.8;
      }
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
  }
`;

export default StyledNavbar;
