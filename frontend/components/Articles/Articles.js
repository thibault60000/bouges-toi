import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { adopt } from "react-adopt";
import gql from "graphql-tag";
import isEmpty from "lodash.isempty";

// Styled
import {
  StyledArticlesContainer,
  StyledArticlesList,
  StyledPageSlogan,
  StyledTimeIcon
} from "../styles/StyledArticle";

// Filters
import FiltersAdresses, {
  SEARCH_ARTICLES_QUERY_ADRESSES
} from "../Filters/FiltersAdresses";
import FiltersNbPersons, {
  SEARCH_ARTICLES_QUERY_NB_PERSONS
} from "../Filters/FiltersNbPersons";
import User from "../Authentication/User";

// Paginations
import PaginationNbPersons from "../Paginations/ArticleNbPersonsPagination";

import Article from "./Article";
import Pagination from "../Pagination";
import { perPage } from "../../config";
import Search from "../Search";

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

const Composed = adopt({
  // User Component
  user: ({ render }) => <User>{render}</User>,
  // Main Search Query
  getLastArticles: ({ page, render }) => (
    <Query
      query={ARTICLES_QUERY}
      variables={{
        skip: page * perPage - perPage
      }}
    >
      {render}
    </Query>
  )
});

class Articles extends Component {
  // State
  state = {
    articlesNbPersons: []
  };
  // Start Search By NbPersons
  startSearchNbPersons = async (min, max, client) => {
    const response = await client.query({
      query: SEARCH_ARTICLES_QUERY_NB_PERSONS,
      variables: {
        numberMin: min,
        numberMax: max,
        skip: this.props.page * perPage - perPage
      }
    });
    const { articles } = response.data;
    this.setState({
      articlesNbPersons: articles,
      min: min,
      max: max
    });
  };
  /* ------------------
  ------ Render -------
  ---------------------*/
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Composed page={this.props.page}>
            {({ user, getLastArticles }) => {
              /* Variables */
              const me = user.data.me;
              const { articles } = getLastArticles.data;
              const { min, max } = this.state;
              const { articlesNbPersons } = this.state;
              /* Si User non authentifié */
              if (!me) return null;
              return (
                <StyledArticlesContainer>
                  {/* SearchBar */}
                  <Search />
                  {/* Filters */}
                  <FiltersNbPersons
                    page={this.props.page}
                    startSearch={this.startSearchNbPersons}
                    client={client}
                  />
                  {/* Si recherche par nombre de personnes */}
                  {articlesNbPersons.length && (
                    <>
                      {/* Title */}
                      <StyledPageSlogan>
                        Filtre par nombre de personnes
                      </StyledPageSlogan>
                      {/* Pagination 1 */}
                      <PaginationNbPersons
                        min={min}
                        max={max}
                        page={this.props.page}
                      />
                      
                      {/* Liste d'articles */}
                      <StyledArticlesList>
                        {articlesNbPersons.map(article => (
                          /* Article */
                          <Article
                            me={me}
                            article={article}
                            key={article.id + "findArticles"}
                          />
                        ))}
                      </StyledArticlesList>
                      {/* Pagination 2*/}
                      <PaginationNbPersons
                        min={min}
                        max={max}
                        page={this.props.page}
                      />
                    </>
                  )}
                  {/* Liste des derniers évènements */}
                  {isEmpty(articlesNbPersons) && articles.length ? (
                    <>
                      {/* Title */}
                      <StyledPageSlogan>
                        <StyledTimeIcon /> Les derniers évènements
                      </StyledPageSlogan>
                      {/* Pagination 1 */}
                      <Pagination page={this.props.page} />
                      {/* Liste d'articles  */}
                      <StyledArticlesList>
                        {articles.map(article => (
                          /* Article */
                          <Article me={me} article={article} key={article.id} />
                        ))}
                      </StyledArticlesList>
                      {/* Pagination 2*/}
                      <Pagination page={this.props.page} />
                    </>
                  ) : (
                    <p> Aucun évènement </p>
                  )}
                </StyledArticlesContainer>
              );
            }}
          </Composed>
        )}
      </ApolloConsumer>
    );
  }
}

export default Articles;
export { ARTICLES_QUERY };
