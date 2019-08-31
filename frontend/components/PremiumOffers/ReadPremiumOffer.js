import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "../Error";
import styled from "styled-components";
import Head from "next/head";

const StyledReadPremiumOffer = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 2rem auto;
  box-shadow: ${props => props.theme.boxS};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .informations {
    margin: 2.5rem;
    font-size: 1.8rem;
  }
`;
const READ_PREMIUM_OFFER_QUERY = gql`
  query READ_PREMIUM_OFFER_QUERY($id: ID!) {
    premiumOffer(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

class ReadPremiumOffer extends Component {
  render() {
    return (
      <div>
        <Query
          query={READ_PREMIUM_OFFER_QUERY}
          variables={{ id: this.props.id }}
        >
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p> Chargement... </p>;
            const premiumOffer = data.premiumOffer;
            return (
              <StyledReadPremiumOffer>
                <Head>
                  <title> Bouges toi ! Sortie : {premiumOffer.title}</title>
                </Head>
                <div className="informations">
                  <h2> Offre Premium : {premiumOffer.title}</h2>
                  <p> {premiumOffer.description}</p>
                  <p> Prix : {premiumOffer.price} </p>
                </div>
              </StyledReadPremiumOffer>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ReadPremiumOffer;
