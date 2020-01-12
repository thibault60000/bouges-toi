import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import { adopt } from "react-adopt";
import isEmpty from "lodash.isempty";

// Styled
import { StyledArticlesContainer } from "../styles/StyledArticle";

// Filters
import FiltersNbPersons from "../Filters/FiltersNbPersons";
import FiltersAdresses from "../Filters/FiltersAdresses";

// User
import User from "../Authentication/User";

// Search Results
import LastArticlesSearch from "../SearchResults/LastArticlesSearch";
import NbPersonsSearch, {
  SEARCH_ARTICLES_QUERY_NB_PERSONS
} from "../SearchResults/NbPersonsSearch";
import AdressesSearch, {
  SEARCH_ARTICLES_QUERY_ADRESSES
} from "../SearchResults/AdressesSearch";

import { perPage } from "../../config";
import Search from "../Search";

const Composed = adopt({
  // User Component
  user: ({ render }) => <User>{render}</User>
});

class Articles extends Component {
  // State
  state = {
    articlesNbPersons: [],
    articlesAdresses: []
  };
  clearFilter = () => {
    this.setState({
      articlesNbPersons: [],
      articlesAdresses: []
    });
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
  // Start Search By Adresses
  startSearchByAdresses = async (adresses, client) => {
    const response = await client.query({
      query: SEARCH_ARTICLES_QUERY_ADRESSES,
      variables: {
        searchTerm: adresses,
        skip: this.props.page * perPage - perPage
      }
    });
    const { articles } = response.data;
    this.setState({
      articlesAdresses: articles,
      adresses: adresses
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
              const { min, max, adresses } = this.state;
              const { articlesNbPersons, articlesAdresses } = this.state;
              /* Si User non authentifié */
              if (!me) return <p> Connectez vous pour accéder au site</p>;
              return (
                <StyledArticlesContainer>
                  {/* SearchBar */}
                  <Search />
                  {/* Filters */}
                  <FiltersNbPersons
                    startSearch={this.startSearchNbPersons}
                    client={client}
                  />
                  <FiltersAdresses
                    client={client}
                    startSearch={this.startSearchByAdresses}
                  />
                  {/* Si recherche par nombre de personnes */}
                  {!isEmpty(articlesNbPersons) && (
                    <NbPersonsSearch
                      clearFilter={this.clearFilter}
                      me={me}
                      page={this.props.page}
                      min={min}
                      max={max}
                    />
                  )}
                  {/* Si je recherche par adresses */}
                  {!isEmpty(articlesAdresses) && (
                    <AdressesSearch
                      clearFilter={this.clearFilter}
                      me={me}
                      page={this.props.page}
                      adresses={adresses}
                    />
                  )}
                  {/* Liste des derniers évènements */}
                  {isEmpty(articlesNbPersons) && isEmpty(articlesAdresses) && (
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
