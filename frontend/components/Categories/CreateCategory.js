import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import StyledForm from "../styles/StyledForm";
import StyledRadioRubriques from "../styles/StyledRadioRubriques";
import Error from "../Error";

const CREATE_CATEGORY_MUTATION = gql`
  mutation CREATE_CATEGORY_MUTATION($title: String!, $rubrique: String!) {
    createCategoryRubrique(title: $title, rubrique: $rubrique) {
      id
    }
  }
`;

const RUBRIQUES_QUERY = gql`
  query RUBRIQUES_QUERY {
    rubriques {
      id
      title
      image
    }
  }
`;

export class CreateCategory extends Component {
  state = {
    title: "",
    rubrique: ""
  };

  // Handle Change
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleRubriqueChange = e => {
    console.log(e);
    this.setState({
      rubrique: e.target.id
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_CATEGORY_MUTATION} variables={this.state}>
        {(createCategoryRubrique, { data, loading, error }) => (
          <StyledForm
            disabled={loading}
            aria-busy={loading}
            onSubmit={async e => {
              e.preventDefault();
              const response = await createCategoryRubrique();
              Router.push({
                pathname: "/categories/category",
                query: { id: response.data.createCategoryRubrique.id }
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

              <label> Rubrique </label>
              {/* RUBRIQUES */}
              <Query query={RUBRIQUES_QUERY}>
                {({ data, loading }) => {
                  if (loading) return <p>Chargement...</p>;
                  return (
                    <StyledRadioRubriques>
                      {data.rubriques.map(rubrique => (
                        <p key={rubrique.id}>
                          <input
                            type="radio"
                            onChange={this.handleRubriqueChange}
                            checked={this.state.rubrique === rubrique.id}
                            id={`${rubrique.id}`}
                            name="radioBtnRubrique"
                            value={rubrique.title}
                          />
                          <label
                            htmlFor={`${rubrique.id}`}
                            style={{
                              backgroundImage: `url('${rubrique.image}')`
                            }}
                          >
                            <span>{rubrique.title}</span>
                          </label>
                        </p>
                      ))}
                    </StyledRadioRubriques>
                  );
                }}
              </Query>

              {/* Submit */}
              <button type="submit"> Créer </button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default CreateCategory;
