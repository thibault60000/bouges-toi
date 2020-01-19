import styled from "styled-components";

const StyledNavbar = styled.ul`
  /* Liste de liens */
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 98%;
  margin: 0 auto;
  z-index: 100;
  > div {
    /* Container de liens */
    background-color: white;
    display: flex;
    position: absolute;
    flex-direction: column;
    padding: 1rem 1rem 1rem;
    box-shadow: 2px 1px 7px 1px rgba(39, 35, 35, 0.08);
    width: calc(100% - 1rem);
    margin: 1.5rem auto;
    left: 2%;
    top: 6.8rem;
    opacity: 1;
    transition-duration: 0.8s;
    transition-property: top, opacity;
  }
  /* Liens et boutons */
  button:not(.menuBtn),
  a {
    background: none;
    display: flex;
    align-items: center;
    border: 0;
    padding: 0.5rem 1rem;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1em;
    :hover {
      color: ${props => props.theme.bt_orange};
    }
    /* Bouton 'Authentification' */
    &.authentication,
    &.authentication {
      background-color: ${props => props.theme.bt_orange};
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
  /* Lorsque la liste de liens est ouverte */
  ${props =>
    !props.open &&
    `
    > div {
      opacity: 0;
      top: -50vh;
      z-index: -1;
      transition-duration: 0.8s;
      transition-property: top, opacity;
    }
    > .menuBtn {
      top: 1.7rem;
      transition-duration: 0.2s;
      transition-property: top;
    }
    `}
`;

export default StyledNavbar;
