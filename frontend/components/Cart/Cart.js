import React from "react";
import { Query, Mutation } from "react-apollo";
import { adopt } from "react-adopt";
import gql from "graphql-tag";
import User from "../Authentication/User";
import styled from "styled-components";
import StyledCart from "../styles/StyledCart";
import CartItem from "./CartItem";
import calcTotalPrice from "../../lib/calcTotalPrice";
import formatMoney from "../../lib/formatMoney";
import TakeMyMoney from "../TakeMyMoney";
import { ArrowBack } from "styled-icons/boxicons-regular/ArrowBack";

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const StyledGoBuyButton = styled.button`
  border: none;
  font-size: 2.6rem;
  background: #607d8b;
  color: white;
  padding: 0.4rem 1.6rem;
  border-radius: 2px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

// Adopt
const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});

// Cart Component
const Cart = () => {
  return (
    <Composed>
      {({ user, toggleCart, localState }) => {
        /* Test si user authentifié */
        const me = user.data.me;
        if (!me) return null;
        return (
          /* Récupère l'état du panier avec une Query Local @client */
          <StyledCart open={localState.data.cartOpen}>
            <header>
              {/* Toggle l'état du panier avec une mutation locale @client  */}
              <button className="previous-btn" onClick={toggleCart}>
                {" "}
                <ArrowBack /> <span> Retour </span>{" "}
              </button>
              <h3>
                {" "}
                Panier de <strong>{me.name}</strong>{" "}
              </h3>
              <p className="cart-counter">
                Vous avez{" "}
                <strong>
                  {me.cart.length} élément
                  {me.cart.length !== 1 && "s"}
                </strong>{" "}
                dans votre panier
              </p>
            </header>
            {/* Liste de tous les éléments du panier */}
            <ul>
              {me.cart.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>
            <footer>
              {/* Calcul le prix total des objets du panier */}
              <p> {formatMoney(calcTotalPrice(me.cart))} </p>
              {me.cart.length ? (
                <TakeMyMoney>
                  <StyledGoBuyButton> Passer au paiement </StyledGoBuyButton>
                </TakeMyMoney>
              ) : (
                ""
              )}
            </footer>
          </StyledCart>
        );
      }}
    </Composed>
  );
};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
