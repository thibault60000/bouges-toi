import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import StyledCart from "../styles/StyledCart";

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
    <Mutation mutation={TOGGLE_CART_MUTATION}>
      {toggleCart => (
        <Query query={LOCAL_STATE_QUERY}>
          {({ data }) => (
            <StyledCart open={data.cartOpen}>
              <header>
                <button onClick={toggleCart}> &times; </button>
                <h3> Votre panier </h3>
                <p> Vous avez ... éléments dans votre panier </p>
              </header>
              <footer>
                <p> 10.00 € </p>
                <button> Passer au paiement </button>
              </footer>
            </StyledCart>
          )}
        </Query>
      )}
    </Mutation>
  );
};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
