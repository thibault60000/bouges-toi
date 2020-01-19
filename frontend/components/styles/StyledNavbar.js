import styled from "styled-components";
import { ShoppingCart } from "styled-icons/typicons/ShoppingCart";
import { Menu } from "styled-icons/boxicons-regular/Menu";
import { Close } from "styled-icons/material/Close";

const MenuIcon = styled(Menu)`
  color: #4f4949;
`;
const CloseIcon = styled(Close)`
  color: #4f4949;
`;

const ShoppingCartIcon = styled(ShoppingCart)`
  color: #4f4949;
  width: 2.8rem;
  margin-right: 0.5rem;
`;

const StyledMenuButton = styled.button`
  position: absolute;
  top: 8.5rem;
  border: none;
  background: initial;
  outline: none;
  right: 0;
  width: 5rem;
  height: 5rem;
  transition-duration: 0.8s;
  transition-property: top;
  z-index: 15;
  :hover {
    cursor: pointer;
  }
  :hover svg {
    color: ${props => props.theme.bt_orange};
  }
`;

const StyledShoppingbutton = styled.button`
  font-family: "robotoregular";
  text-transform: "uppercase";
  color: #4f4949;
  :hover svg {
    color: ${props => props.theme.bt_orange};
  }
  :hover div.count {
    background-color: ${props => props.theme.bt_orange};
  }
`;

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
      background-color: #d9501e;
      border: 2px solid #d9501e;
      color: white;
      border-radius: 3px;
      margin: 0.4rem 0;
      width: 150px;
      :hover {
        background-color: white;
        color: #d9501e;
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

export {
  StyledNavbar,
  MenuIcon,
  CloseIcon,
  ShoppingCartIcon,
  StyledMenuButton,
  StyledShoppingbutton
};
