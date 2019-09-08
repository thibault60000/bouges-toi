import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
/* import withScrollReveal from 'react-scrollreveal' */

import Article from "./Article";
import Pagination from "../Pagination";
import { perPage } from "../../config";
import Search from "../Search";

// https://www.npmjs.com/package/react-scrollreveal
const ARTICLES_QUERY = gql`
  query ARTICLES_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    articles(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      description
      image
      price
      nbPersons
      adresse
      begin_date
      end_date
      createdAt
      updatedAt
      user {
        id
        name
        surname
      }
      users {
        id
      }
    }
  }
`;

const StyledArticlesContainer = styled.div`
  text-align: center;
`;
const StyledArticlesList = styled.ul`
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  li {
    list-style: none;
  }
`;

const StyledPageSlogan = styled.p`
  font-weight: bold;
  font-size: 2.5rem;
`;

class Articles extends Component {
  render() {
    return (
      <StyledArticlesContainer>
        {/* Title */}
        <Search />
        <StyledPageSlogan> Liste des sorties en cours </StyledPageSlogan>
        {/* Pagination 1 */}
        <Pagination page={this.props.page} />
        {/* Query */}
        <Query
          query={ARTICLES_QUERY}
          variables={{
            skip: this.props.page * perPage - perPage
          }}
          fetchPolicy='network-only'
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Chargement</p>;
            if (error) return <p> Erreur : {error.message}</p>;
            return (
              <StyledArticlesList>
                {data.articles.map(article => (
                  <Article article={article} key={article.id} />
                ))}
              </StyledArticlesList>
            );
          }}
        </Query>
        {/* Pagination 2*/}
        <Pagination page={this.props.page} />
      </StyledArticlesContainer>
    );
  }
}

export default Articles;
export { ARTICLES_QUERY };
