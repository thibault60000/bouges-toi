import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ARTICLES_QUERY } from "../SearchResults/LastArticlesSearch";
import Router from "next/router";
import { PAGINATION_ARTICLE_QUERY } from "../Paginations/LastArticlesPagination";

const DELETE_ARTICLE_MUTATION = gql`
  mutation DELETE_ARTICLE_MUTATION($id: ID!) {
    deleteArticle(id: $id) {
      id
    }
  }
`;

class DeleteArticle extends Component {
  // Delete Article
  deleteArticleMethod = deleteArticle => {
    deleteArticle({
      variables: {
        id: this.props.id
      }
    }).catch(err => {
      alert(err.message);
    });
    Router.push({
      pathname: "/articles/articles",
      query: { page: 1 }
    });
  };

  // Update after removing
  update = (cache, payload) => {
    // 1. Lire le cache pour connaître les articles
    const data = cache.readQuery({ query: ARTICLES_QUERY });
    // 2. Filtrer en enlevant l'article que l'on souhaite retirer
    data.articles = data.articles.filter(
      a => a.id !== payload.data.deleteArticle.id
    );
    // 3. Réécrire le cache avec les nouvelles données
    cache.writeQuery({ query: ARTICLES_QUERY, data });
  };

  // Render
  render() {
    return (
      <Mutation
        mutation={DELETE_ARTICLE_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
        refetchQueries={[{ query: PAGINATION_ARTICLE_QUERY }]}
      >
        {(deleteArticle, { data, error, loading }) => (
          <button
            onClick={() => {
              if (confirm("Êtes vous sûr de vouloir supprimer cet article")) {
                this.deleteArticleMethod(deleteArticle);
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteArticle;
