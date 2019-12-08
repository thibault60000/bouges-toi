import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import { PAGINATION_ARTICLE_QUERY } from "../Paginations/LastArticlesPagination";
import { READ_ARTICLE_QUERY } from "./ReadArticle";

const EXIT_ARTICLE_MUTATION = gql`
  mutation EXIT_ARTICLE_MUTATION($id: ID!) {
    quitArticle(id: $id) {
      id
    }
  }
`;

class ExitArticle extends Component {
  // Join Article
  exitArticleMethod = quitArticle => {
    quitArticle({
      variables: {
        id: this.props.article.id
      }
    })
      .catch(err => {
        alert(err.message);
      })
      .then(() => {
        Router.push({
          pathname: "/articles/article",
          query: { id: this.props.article.id }
        });
      });
  };

  // Render
  render() {
    return (
      <Mutation
        mutation={EXIT_ARTICLE_MUTATION}
        variables={{ id: this.props.article.id }}
        refetchQueries={[{ query: PAGINATION_ARTICLE_QUERY }, { query: READ_ARTICLE_QUERY, variables: { id: this.props.article.id }}]}

      >
        {(quitArticle, { data, error, loading }) => {
          return <button
            className="exit"
            onClick={() => this.exitArticleMethod(quitArticle)}
          >
            {this.props.children}
          </button>;
        }}
      </Mutation>
    );
  }
}

export default ExitArticle;
