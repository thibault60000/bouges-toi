import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import User from "../Authentication/User";
import StyledCart from "../styles/StyledCart";
import CartItem from "./CartItem";
import calcTotalPrice from "../../lib/calcTotalPrice";
import formatMoney from "../../lib/formatMoney";

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

const Cart = () => {
  return (
    <User>
      {({ data: { me } }) => {
        if (!me) return null;
        console.log(me);
        return (
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {toggleCart => (
              <Query query={LOCAL_STATE_QUERY}>
                {({ data }) => (
                  <StyledCart open={data.cartOpen}>
                    <header>
                      <button onClick={toggleCart}> &times; </button>
                      <h3> Panier de {me.name} </h3>
                      <p>
                        Vous avez {me.cart.length} élément
                        {me.cart.length !== 1 && "s"} dans votre panier{" "}
                      </p>
                    </header>
                    <ul>
                      {me.cart.map(cartItem => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                      ))}
                    </ul>
                    <footer>
                      <p> { formatMoney(calcTotalPrice(me.cart)) } </p>
                      <button> Passer au paiement </button>
                    </footer>
                  </StyledCart>
                )}
              </Query>
            )}
          </Mutation>
        );
      }}
    </User>
  );
};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
