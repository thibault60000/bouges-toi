import React from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../Authentication/User";

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const StyledDeleteCartButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

class RemoveFromCart extends React.Component {
  // PropTypes
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  // Update
  update = (cache, payload) => {
    // 1. Lire le cache
    const data = cache.readQuery({
      query: CURRENT_USER_QUERY
    });
    // 2. Supprime l'élément du panier
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    // 4. Supprime l'élément du cache en écrivant dans le cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };

  // Render
  render() {
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
        optimisticResponse={{
          __typename: "Mutation",
          removeFromCart: {
            __typename: "CartItem",
            id: this.props.id,
            quantity: 1
          }
        }}
      >
        {(removeFromCart, { loading, error }) => (
          <StyledDeleteCartButton
            disabled={loading}
            onClick={() => {
              removeFromCart().catch(err => alert(err.message));
            }}
            title="Supprimer l'élément du panier"
          >
            &times;
          </StyledDeleteCartButton>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
