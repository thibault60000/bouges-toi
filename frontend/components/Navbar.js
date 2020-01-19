import Link from "next/link";
import { Mutation, Query } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart/Cart";
import { adopt } from "react-adopt";
import gql from "graphql-tag";
import StyledNavbar from "./styles/StyledNavbar";
import User from "./Authentication/User";
import Signout from "./Authentication/Signout";
import CartCount from "./Cart/CartCount";
import styled from "styled-components";
import { ShoppingCart } from "styled-icons/typicons/ShoppingCart";
import { Menu } from "styled-icons/boxicons-regular/Menu";
import { Close } from "styled-icons/material/Close";
const LOCAL_STATE_QUERY_MENU_OPEN = gql`
  query {
    menuOpen @client
  }
`;

const TOGGLE_MENU_MUTATION = gql`
  mutation {
    toggleMenu @client
  }
`;

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

const Composed = adopt({
  toggleMenu: ({ render }) => (
    <Mutation mutation={TOGGLE_MENU_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => (
    <Query query={LOCAL_STATE_QUERY_MENU_OPEN}>{render}</Query>
  )
});

const Navbar = () => (
  <User>
    {({ data: { me } }) => (
      <Composed>
        {({ toggleMenu, localState }) => {
          return (
            <StyledNavbar open={localState.data.menuOpen}>
              <StyledMenuButton onClick={toggleMenu} className="menuBtn">
                {/* Burger Menu Bouton */}
                {localState.data.menuOpen ? <CloseIcon /> : <MenuIcon />}
              </StyledMenuButton>
              <div>
                <Link href="/">
                  <a> Accueil </a>
                </Link>
                {me && me.permissions.includes("ADMIN") && (
                  <Link href="/adminPage">
                    <a> Admin </a>
                  </Link>
                )}
                {me && (
                  <>
                    <Link href="/articles/createArticlePage">
                      <a> Création </a>
                    </Link>
                    <Link
                      href={{
                        pathname: "/users/userPage",
                        query: { id: me.id }
                      }}
                    >
                      <a> Mon Compte </a>
                    </Link>
                    <Link href="/articles/articles">
                      <a> Articles </a>
                    </Link>
                    {/* <Link href="/commandes">
              <a> Commandes </a>
            </Link> */}
                    <Link href="/premiumOffers/premiumOffersPage">
                      <a> Offres payantes </a>
                    </Link>
                    {/* <Link href="/orders/orders">
              <a> Mon Compte </a>
            </Link> */}
                    <Mutation mutation={TOGGLE_CART_MUTATION}>
                      {toggleCart => (
                        <StyledShoppingbutton onClick={toggleCart}>
                          <ShoppingCartIcon /> Panier
                          <CartCount
                            count={me.cart.reduce(
                              (tally, cartItem) => tally + cartItem.quantity,
                              0
                            )}
                          />
                        </StyledShoppingbutton>
                      )}
                    </Mutation>

                    <Signout />
                  </>
                )}

                {!me && (
                  <Link href="/signup">
                    <a className="authentication"> Inscription </a>
                  </Link>
                )}
                {!me && (
                  <Link href="/login">
                    <a className="authentication"> Connexion </a>
                  </Link>
                )}
              </div>
            </StyledNavbar>
          );
        }}
      </Composed>
    )}
  </User>
);

export default Navbar;
export { LOCAL_STATE_QUERY_MENU_OPEN };
