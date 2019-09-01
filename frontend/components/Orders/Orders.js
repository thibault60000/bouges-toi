import React, { Component } from "react";
import { Query } from "react-apollo";
import moment from "moment";
import Link from "next/link";
import styled from "styled-components";
import gql from "graphql-tag";
import Error from "../Error";
import formatMoney from "../../lib/formatMoney";
import StyledOrderItem from "../styles/StyledOrderItem";
moment.locale("fr");

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
      }
    }
  }
`;

const StyledOrderList = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

class Orders extends Component {
  render() {
    return (
      <Query query={USER_ORDERS_QUERY}>
        {({ data: { orders }, loading, error }) => {
          if (loading) return <p> Chargement... </p>;
          if (error) return <Error error={error} />;
          return (
            <div>
              <h2>
                Vous avez {orders.length} commande{orders.length > 1 && "s"}
              </h2>
              <StyledOrderList>
                {orders.map(order => (
                  <StyledOrderItem key={order.id}>
                    <Link
                      href={{
                        pathname: "/orders/order",
                        query: { id: order.id }
                      }}
                    >
                      <a>
                        <div className="order-meta">
                          { console.log(order) }
                          <p>
                            {order.items &&
                              order.items.reduce(
                                (a, b) => a + b.quantity,
                                0
                              )} offres preniums
                            
                          </p>
                          <p> Parmi {order.items && order.items.length} éléments  </p>
                          <p> { moment(order.createdAt).calendar() } </p>
                        </div>
                        {/*  <div className="images">
                            { order.items && order.items.map(item => (
                                <img key={item.id} src={item.image} alt={item.title} />
                            ))}
                        </div> */}
                      </a>
                    </Link>
                  </StyledOrderItem>
                ))}
              </StyledOrderList>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Orders;
