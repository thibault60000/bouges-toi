import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "../Authentication/User";
import Error from "../Error";
import { AddShoppingCart } from "styled-icons/material/AddShoppingCart";

const StyledAddShoppingCartIcon = styled(AddShoppingCart)`
    display: block;
    height: 2.2rem;
    margin: 0 auto 0.6rem;
    span {
      display:block;
    }
`;

const AddShoppingCartButton = styled.button`
  border: none;
  background: #454b73;
  color: white;
  border-radius: 3px;
  width: 15rem;
  height: 8rem;
  margin: 1rem 0;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

class AddToCart extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{
          id
        }}
        optimisticResponse={{
          __typename: "Mutation",
          addToCart: {
            __typename: "CartItem",
            id: this.props.id,
            quantity: 1
          }
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToCart, { data, loading, error }) => {
          if (error) alert(error.message.split(": ")[1]);
          return (
            <AddShoppingCartButton disabled={loading} onClick={addToCart}>
              <StyledAddShoppingCartIcon />{" "}
              <span>{loading ? "Ajout en cours" : "Ajouter au panier"}</span>
            </AddShoppingCartButton>
          );
        }}
      </Mutation>
    );
  }
}

export default AddToCart;
