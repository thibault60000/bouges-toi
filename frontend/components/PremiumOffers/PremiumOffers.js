import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import PremiumOffer from "./PremiumOffer";

const PREMIUM_OFFERS_QUERY = gql`
  query PREMIUM_OFFERS_QUERY {
    premiumOffers {
      id
      title
      description
      price
      user {
        id
      }
    }
  }
`;

const StyledPremiumOffersContainer = styled.div`
  text-align: center;
`;
const StyledPremiumOffersList = styled.ul`
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  li {
    list-style: none;
  }
`;

class PremiumOffers extends Component {
  render() {
    return (
      <StyledPremiumOffersContainer>
        <Query query={PREMIUM_OFFERS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p> Chargement ... </p>;
            if (error) return <p> Erreur : {error.message} </p>;
            return (
              <StyledPremiumOffersList>
                {data.premiumOffers.map(premiumOffer => (
                  <PremiumOffer
                    premiumOffer={premiumOffer}
                    key={premiumOffer.id}
                  />
                ))}
              </StyledPremiumOffersList>
            );
          }}
        </Query>
      </StyledPremiumOffersContainer>
    );
  }
}

export default PremiumOffers;
export { PREMIUM_OFFERS_QUERY };
