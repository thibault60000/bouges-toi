import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import StyledForm from "../styles/StyledForm";
import Error from "../Error";
import Router from "next/router";

const CREATE_PREMIUM_OFFER_MUTATION = gql`
  mutation CREATE_PREMIUM_OFFER_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
  ) {
    createPremiumOffer(
      title: $title
      description: $description
      price: $price
    ) {
      id
    }
  }
`;
export class CreatePremiumOffer extends Component {
  state = {
    title: "",
    description: "",
    price: 0
  };

  // Handle Change
  handleChange = e => {
    const { name, type, value } = e.target;
    const v = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: v });
  };

  render() {
    return (
      <Mutation mutation={CREATE_PREMIUM_OFFER_MUTATION} variables={this.state}>
        {(createPremiumOffer, { data, loading, error }) => (
          <StyledForm
            disabled={loading}
            aria-busy={loading}
            onSubmit={async e => {
              e.preventDefault();
              const response = await createPremiumOffer();
              Router.push({
                pathname: "/premiumOffers/premiumOfferPage",
                query: { id: response.data.createPremiumOffer.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset>
              {/* Titre */}
              <label htmlFor="title">
                Titre
                <input
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                  id="title"
                  name="title"
                  placeholder="Titre"
                  required
                />
              </label>
              {/* Description */}
              <label htmlFor="description">
                Description
                <textarea
                  value={this.state.description}
                  onChange={this.handleChange}
                  id="description"
                  name="description"
                  placeholder="Description"
                  required
                />
              </label>
              {/* Prix */}
              <label htmlFor="price">
                Prix
                <input
                  type="number"
                  value={this.state.price}
                  onChange={this.handleChange}
                  id="price"
                  name="price"
                  placeholder="Prix"
                  required
                />
              </label>
              {/* Submit */}
              <button type="submit"> Créer l'offre </button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default CreatePremiumOffer;
