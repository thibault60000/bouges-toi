import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import StyledForm from "../styles/StyledForm";
import Error from "../Error";
import Router from "next/router";

// QUERY
const GET_ARTICLE_QUERY = gql`
  query GET_ARTICLE_QUERY($id: ID!) {
    article(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

// MUTATION
const UPDATE_ARTICLE_MUTATION = gql`
  mutation UPDATE_ARTICLE_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateArticle(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

// CLASS
export class UpdateArticle extends Component {
  state = {};

  // HandleChange
  handleChange = e => {
    const { name, type, value } = e.target;
    const v = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: v });
  };

  // Update Article
  updateArticle = async (e, mutation) => {
    e.preventDefault();
    await mutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
    Router.push({
      pathname: '/articles'
    });
  };

  // Render
  render() {
    return (
      <Query query={GET_ARTICLE_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p> Chargement ... </p>;
          if (!data.article)
            return (
              <p> Pas d'article trouvé avec l'identifiant {this.props.id} </p>
            );
          return (
            <Mutation mutation={UPDATE_ARTICLE_MUTATION} variables={this.state}>
              {(updateArticle, { loading, error }) => (
                <StyledForm
                  disabled={loading}
                  aria-busy={loading}
                  onSubmit={e => {
                    this.updateArticle(e, updateArticle)}
                  }
                >
                  <Error error={error} />
                  <fieldset>
                    {/* Titre */}
                    <label htmlFor="title">
                      Titre
                      <input
                        type="text"
                        defaultValue={data.article.title}
                        onChange={this.handleChange}
                        id="title"
                        name="title"
                        placeholder="Titre"
                        required
                      />
                    </label>
                    {/* Description */}
                    <label htmlFor="description">
                      Titre
                      <textarea
                        defaultValue={data.article.description}
                        onChange={this.handleChange}
                        id="description"
                        name="description"
                        placeholder="Description"
                        required
                      />
                    </label>
                    {/* Prix */}
                    <label htmlFor="price">
                      <input
                        type="number"
                        defaultValue={data.article.price}
                        onChange={this.handleChange}
                        id="price"
                        name="price"
                        placeholder="Prix"
                        required
                      />
                      <span className="free">
                        {data.article.price === 0 ? "Gratuit" : ""}
                      </span>
                    </label>
                    {/* Submit */}
                    <button type="submit">
                      {loading ? "Modification en cours" : "Modifier"}{" "}
                    </button>
                  </fieldset>
                </StyledForm>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateArticle;


