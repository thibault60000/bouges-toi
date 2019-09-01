import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import moment from "moment";
import Head from "next/head";
import gql from "graphql-tag";
import formatMoney from "../../lib/formatMoney";
import Error from "../Error";
import StyledOrder from "../styles/StyledOrder";
moment.locale("fr");

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
        name
        surname
      }
      items {
        id
        title
        description
        price
        quantity
      }
    }
  }
`;
class Order extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };
  render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p> Chargement ... </p>;
          const order = data.order;
          return (
            <StyledOrder>
              <Head>
                <title> Bouges-toi - Commande {order.id} </title>
              </Head>
              <p>
                <strong>Commande :</strong> <span>{this.props.id}</span>
              </p>
              <p>
                <strong>Numéro de transaction :</strong>{" "}
                <span>{order.charge}</span>
              </p>
              <p>
                <strong>Date :</strong>
                <span>
                  {moment(order.createdAt).format("Do MMMM YYYY, h:mm:ss")}
                </span>
              </p>
              <p>
                <strong>Nombre d'éléments : </strong>
                <span> {order.items.length}</span>
              </p>
              <p>
                <strong>Total : </strong>
                <span> {formatMoney(order.total)}</span>
              </p>
              {/*  Liste d'éléments dans la commande  */}
              <div className="items">
                {order.items.map(item => (
                  <div className="order-item">
                    {/* <img src={item.image} title={item.title} /> */}
                    <div className="order-item-details">
                      <h3> {item.title} </h3>
                      <p>Quantité : {item.quantité}</p>
                      <p> Unité : {formatMoney(item.price)} </p>
                      <p>
                        Sous total : {formatMoney(
                          item.price * item.quantity
                        )}
                      </p>
                      <p> {item.description} </p>
                    </div>
                  </div>
                ))}
              </div>
            </StyledOrder>
          );
        }}
      </Query>
    );
  }
}

export default Order;
