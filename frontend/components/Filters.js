import React from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";

const SEARCH_ARTICLES_QUERY = gql`
  query SEARCH_ARTICLES_QUERY($searchTerm: String!) {
    articles(where: { OR: [{ adresse_contains: $searchTerm }] }) {
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

class Filters extends React.Component {
  // State
  state = {
    articles: [],
    loading: false
  };
  // OnChange Select
  onChange = debounce(async (e, client) => {
    this.setState({ loading: true });
    // On effectue une requête manuelle grâce à ApolloConsumer
    const response = await client.query({
      query: SEARCH_ARTICLES_QUERY,
      variables: { searchTerm: e.target.value }
    });
    this.setState(
      {
        articles: response.data.articles,
        loading: false
      },
      () => {
        this.props.startSearch(response.data.articles);
      }
    );
  }, 350);
  render() {
    return (
      <div>
        <ApolloConsumer>
          {client => (
            <>
              <input
                type="text"
                placeholder="Adresse"
                onChange={e => {
                  console.log("test");
                  e.persist();
                  this.onChange(e, client);
                }}
              />
            </>
          )}
        </ApolloConsumer>
      </div>
    );
  }
}

export default Filters;
