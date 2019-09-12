import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import { PAGINATION_ARTICLE_QUERY } from "../Pagination";

const JOIN_ARTICLE_MUTATION = gql`
  mutation JOIN_ARTICLE_MUTATION($id: ID!) {
    joinArticle(id: $id) {
      id
    }
  }
`;

class JoinArticle extends Component {
  // Join Article
  joinArticleMethod = joinArticle => {
      console.log(this.props.article.id);
    joinArticle({
      variables: {
        id: this.props.article.id
      }
    }).catch(err => {
      alert(err.message);
    });
    Router.push({
      pathname: "/articles/article",
      query: { id: this.props.article.id }
    });
  };

  // Render
  render() {
    return (
      <Mutation
        mutation={JOIN_ARTICLE_MUTATION}
        variables={{ id: this.props.article.id }}
        refetchQueries={[{ query: PAGINATION_ARTICLE_QUERY }]}
      >
        {(joinArticle, { data, error, loading }) => (
          <button
           className="join"
            onClick={() => this.joinArticleMethod(joinArticle) }
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default JoinArticle;
