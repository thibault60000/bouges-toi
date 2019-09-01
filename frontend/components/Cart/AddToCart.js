import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../Authentication/User";
import Error from "../Error";

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
          return <button disabled={loading} onClick={addToCart}> 
            { loading ? 'Ajout en cours' : 'Ajouter au panier' } </button>;
        }}
      </Mutation>
    );
  }
}

export default AddToCart;
