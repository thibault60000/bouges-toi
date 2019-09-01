import React from "react";
import Stripecheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import calcTotalPrice from "../lib/calcTotalPrice";
import Error from "./Error";
import User, { CURRENT_USER_QUERY } from "./Authentication/User";
import StripeCheckout from "react-stripe-checkout";

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}
class TakeMyMoney extends React.Component {
  // OnToken
  onToken = (res, createOrder) => {
    // 1. Appeler manuellement la mutation avec le Token Stripe
    createOrder({
      variables: {
        token: res.id
      }
    }).catch(err => {
      alert(err.message);
    });
  };

  // Render
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {createOrder => (
              <StripeCheckout
                amount={calcTotalPrice(me.cart)}
                name="Bouges toi !"
                description={`Commande de ${totalItems(
                  me.cart
                )} offres premium`}
                /* image={me.cart[0].premiumOffer && me.cart[0].premiumOffer.image} */
                stripeKey="pk_test_EBtdxMcleU7Ct1ZMs4u6rkUL00b88XL7EX"
                currency="EUR"
                email={me.email}
                token={res => this.onToken(res, createOrder)}
              >
                {this.props.children}
              </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

export default TakeMyMoney;
