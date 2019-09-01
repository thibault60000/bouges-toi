import React from "react";
import { Query, Mutation } from "react-apollo";
import { adopt } from "react-adopt";
import gql from "graphql-tag";
import User from "../Authentication/User";
import StyledCart from "../styles/StyledCart";
import CartItem from "./CartItem";
import calcTotalPrice from "../../lib/calcTotalPrice";
import formatMoney from "../../lib/formatMoney";
import TakeMyMoney from "../TakeMyMoney";

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
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
        console.log(me);
        return (
          /* Récupère l'état du panier avec une Query Local @client */
          <StyledCart open={localState.data.cartOpen}>
            <header>
              {/* Toggle l'état du panier avec une mutation locale @client  */}
              <button onClick={toggleCart}> &times; </button>
              <h3> Panier de {me.name} </h3>
              <p>
                Vous avez {me.cart.length} élément
                {me.cart.length !== 1 && "s"} dans votre panier
              </p>
            </header>
            <ul>
              {me.cart.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>
            <footer>
              <p> {formatMoney(calcTotalPrice(me.cart))} </p>
              <TakeMyMoney>
                <button> Passer au paiement </button>
              </TakeMyMoney>
            </footer>
          </StyledCart>
        );
      }}
    </Composed>
  );
};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
