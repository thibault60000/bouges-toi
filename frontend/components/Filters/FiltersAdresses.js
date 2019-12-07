import React from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import classnames from "classnames";

import StyledAdresseTag from "../styles/StyledAdresseTag";

const SEARCH_ARTICLES_QUERY_ADRESSES = gql`
  query SEARCH_ARTICLES_QUERY_ADRESSES($searchTerm: String) {
    articles(where: { adresse_contains: $searchTerm }) {
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

class FiltersAdresses extends React.Component {
  // State
  state = {
    articles: [],
    loading: false,
    adresseTag: ""
  };

  // OnChange Select Adresse
  onChange = debounce(async (e, client) => {
    const { value } = e.target;
    this.setState({ loading: true, adresseTag: value });
    // On effectue une requête manuelle grâce à ApolloConsumer
    const response = await client.query({
      query: SEARCH_ARTICLES_QUERY,
      variables: { searchTerm: value }
    });
    const { articles } = response.data;
    this.setState(
      {
        articles,
        loading: false
      },
      () => {
        this.props.startSearch(articles);
        setTimeout(() => {
          this.setState({
            adresseTag: ""
          });
        }, 2000);
      }
    );
  }, 350);
  render() {
    const { adresseTag } = this.state;
    return (
      <div>
        <ApolloConsumer>
          {client => (
            <>
              {/* Fitre sur l'adresse */}
              <StyledAdresseTag>
                <input
                  type="text"
                  placeholder="Adresse"
                  onChange={e => {
                    e.persist();
                    this.onChange(e, client);
                  }}
                />
                <span
                  className={classnames("adresseTag", {
                    reveal: adresseTag !== ""
                  })}
                >
                  {adresseTag}
                </span>
              </StyledAdresseTag>
            </>
          )}
        </ApolloConsumer>
      </div>
    );
  }
}

export default FiltersAdresses;
export { SEARCH_ARTICLES_QUERY_ADRESSES };
