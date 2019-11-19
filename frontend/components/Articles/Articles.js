import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Article from "./Article";
import Pagination from "../Pagination";
import { perPage } from "../../config";
import Search from "../Search";
import { Time } from "styled-icons/boxicons-solid/Time";
import User from "../Authentication/User";

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
        name
        surname
        picture
      }
    }
  }
`;

const StyledArticlesContainer = styled.div``;

const StyledArticlesList = styled.ul`
  display: grid;
  max-width: 1200px;
  margin: 0;
  grid-template-rows: repeat(6, 210px);
  grid-gap: 40px;
  padding-left: 0.4rem !important;
  li {
    list-style: none;
  }
`;

export const StyledPageSlogan = styled.p`
  font-weight: bold;
  font-size: 2.5rem;
  color: #4f5770;
  margin: 3.5rem 0 0.5rem 0;
`;

const StyledTimeIcon = styled(Time)`
  height: 2.5rem;
`;

class Articles extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <StyledArticlesContainer>
            {/* Title */}
            <Search />
            <StyledPageSlogan>
              <StyledTimeIcon /> Les derniers évènements
            </StyledPageSlogan>

            {/* Query */}
            <Query
              query={ARTICLES_QUERY}
              variables={{
                skip: this.props.page * perPage - perPage
              }}
              fetchPolicy="network-only"
            >
              {({ data, error, loading }) => {
                if (loading) return <p>Chargement</p>;
                if (error) return <p> Erreur : {error.message}</p>;
                return data.articles.length ? (
                  <>
                    {/* Pagination 1 */}
                    <Pagination page={this.props.page} />
                    <StyledArticlesList>
                      {data.articles.map(article => (
                        <Article me={me} article={article} key={article.id} />
                      ))}
                    </StyledArticlesList>
                    {/* Pagination 2*/}
                    <Pagination page={this.props.page} />
                  </>
                ) : (
                  <p> Aucun évènement </p>
                );
              }}
            </Query>
          </StyledArticlesContainer>
        )}
      </User>
    );
  }
}

export default Articles;
export { ARTICLES_QUERY };
