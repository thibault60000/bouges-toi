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

// Total Items
function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

// Take My Money Component
class TakeMyMoney extends React.Component {
  // OnToken
  onToken = async (res, createOrder) => {
    NProgress.start();
    const order = await createOrder({
      variables: {
        token: res.id
      }
    }).catch(err => {
      alert(err.message);
    });
    Router.push({
      pathname: "/orders/order",
      query: { id: order.data.createOrder.id }
    });
  };

  // Render
  render() {
    return (
      <User>
        {({ data: { me }, loading }) => {
          if (loading) return null;
          return (
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
                  /* image={me.cart?length && me.cart[0].premiumOffer && me.cart[0].premiumOffer.image} */
                  stripeKey="pk_test_EBtdxMcleU7Ct1ZMs4u6rkUL00b88XL7EX"
                  currency="EUR"
                  email={me.email}
                  token={res => this.onToken(res, createOrder)}
                >
                  {this.props.children}
                </StripeCheckout>
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

export default TakeMyMoney;
