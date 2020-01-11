import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import { adopt } from "react-adopt";
import isEmpty from "lodash.isempty";

// Styled
import {
  StyledArticlesContainer
} from "../styles/StyledArticle";

// Filters
import FiltersNbPersons from "../Filters/FiltersNbPersons";
import User from "../Authentication/User";

// Search Results
import LastArticlesSearch, { ARTICLES_QUERY } from "../SearchResults/LastArticlesSearch";
import NbPersonsSearch, { SEARCH_ARTICLES_QUERY_NB_PERSONS } from "../SearchResults/NbPersonsSearch";

import { perPage } from "../../config";
import Search from "../Search";

const Composed = adopt({
  // User Component
  user: ({ render }) => <User>{render}</User>
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
            {({ user }) => {
              /* Variables */
              const me = user.data.me;
              const { min, max } = this.state;
              const { articlesNbPersons } = this.state;
              /* Si User non authentifié */
              if (!me) return <p> Connectez vous pour accéder au site</p> 
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
                  {!isEmpty(articlesNbPersons) && (
                    <NbPersonsSearch me={me} page={this.props.page} min={min} max={max} />
                  )}
                  {/* Liste des derniers évènements */}
                  {isEmpty(articlesNbPersons) && (
                    <LastArticlesSearch me={me} page={this.props.page} />
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
