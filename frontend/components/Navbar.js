// React Hooks
import { useRouter } from "next/router";

// Apollo Resolvers
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart/Cart";

// React Adopt
import { adopt } from "react-adopt";

// Components
import User from "./Authentication/User";
import Signout from "./Authentication/Signout";
import CartCount from "./Cart/CartCount";

// Styled
import {
  StyledNavbar,
  MenuIcon,
  CloseIcon,
  ShoppingCartIcon,
  StyledMenuButton,
  StyledShoppingbutton
} from "./styles/StyledNavbar";

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

const Composed = adopt({
  toggleMenu: ({ render }) => (
    <Mutation mutation={TOGGLE_MENU_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => (
    <Query query={LOCAL_STATE_QUERY_MENU_OPEN}>{render}</Query>
  )
});

function Navbar() {
  const router = useRouter();
  // Method: Go To Page
  const goToArticle = (href, toggleMenu) => {
    router.push(`${href}`);
    toggleMenu();
  };
  // Method : Go to My Account Page
  const goToMyAccount = (id, toggleMenu) => {
    router.push({
      pathname: "/users/userPage",
      query: { id: id }
    });
    toggleMenu();
  };
  return (
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
                <div className="menuContent">
                  {/* ACCUEIL */}
                  <a onClick={() => goToArticle("/", toggleMenu)}> Accueil </a>
                  {me && me.permissions.includes("ADMIN") && (
                    <a onClick={() => goToArticle("/adminPage", toggleMenu)}>
                      Admin
                    </a>
                  )}
                  {me && (
                    <>
                      {/* CREATION D'ARTICLES */}
                      <a
                        onClick={() =>
                          goToArticle("/articles/createArticlePage", toggleMenu)
                        }
                      >
                        Création
                      </a>
                      {/* MON COMPTE */}
                      <a onClick={() => goToMyAccount(me.id, toggleMenu)}>
                        Mon Compte
                      </a>
                      {/* ARTICLES */}
                      <a
                        onClick={() =>
                          goToArticle("/articles/articles", toggleMenu)
                        }
                      >
                        Articles
                      </a>
                      {/* 
                        <Link href="/commandes">
                        <a> Commandes </a>
                        </Link> 
                      */}

                      {/* OFFRES PAYANTES */}
                      {/* <a
                        onClick={() =>
                          goToArticle(
                            "/premiumOffers/premiumOffersPage",
                            toggleMenu
                          )
                        }
                      >
                        Offres payantes
                      </a> */}

                      {/*
                        <Link href="/orders/orders">
                        <a> Mon Compte </a>
                        </Link> 
                      */}

                      {/* <Mutation mutation={TOGGLE_CART_MUTATION}>
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
                      </Mutation> */}

                      <Signout />
                    </>
                  )}

                  {/* INSCRIPTION */}
                  {!me && (
                    <a
                      onClick={() => goToArticle("/signup", toggleMenu)}
                      className="authentication"
                    >
                      Inscription
                    </a>
                  )}

                  {/* CONNEXION */}
                  {!me && (
                    <a
                      onClick={() => goToArticle("/login", toggleMenu)}
                      className="authentication"
                    >
                      Connexion
                    </a>
                  )}
                </div>
              </StyledNavbar>
            );
          }}
        </Composed>
      )}
    </User>
  );
}

export default Navbar;
export { LOCAL_STATE_QUERY_MENU_OPEN };
