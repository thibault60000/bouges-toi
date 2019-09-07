import Link from "next/link";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart/Cart";

import StyledNavbar from "./styles/StyledNavbar";
import User from "./Authentication/User";
import Signout from "./Authentication/Signout";
import CartCount from "./Cart/CartCount";

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
              {toggleCart => <button onClick={toggleCart}> Mon panier <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} /> </button>}
            </Mutation>

            <Signout />
          </>
        )}

        {!me && (
          <Link href="/login">
            <a> Inscription </a>
          </Link>
        )}
      </StyledNavbar>
    )}
  </User>
);

export default Navbar;
