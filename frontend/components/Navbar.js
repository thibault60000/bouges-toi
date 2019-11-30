import Link from "next/link";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart/Cart";

import StyledNavbar from "./styles/StyledNavbar";
import User from "./Authentication/User";
import Signout from "./Authentication/Signout";
import CartCount from "./Cart/CartCount";
import styled from "styled-components";
import { ShoppingCart } from "styled-icons/typicons/ShoppingCart";

const ShoppingCartIcon = styled(ShoppingCart)`
  color: #4f4949;
  width: 2.8rem;
  margin-right: 0.5rem;
`;

const StyledShoppingbutton = styled.button`
  :hover svg {
    color: #ff460f;
  }
  :hover div.count {
    background-color: #ff460f;
  }
`;

const Navbar = () => (
  <User>
    {({ data: { me } }) => (
      <StyledNavbar>
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
                pathname: "users/userPage",
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
                  <ShoppingCartIcon />
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
      </StyledNavbar>
    )}
  </User>
);

export default Navbar;
