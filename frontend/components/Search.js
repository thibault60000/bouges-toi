import React from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import {
  StyledDropdownArticle,
  StyledDropdownArticleItem,
  StyledDropdownArticleSearch,
  StyledSearchIcon
} from "./styles/StyledDropdownArticle";

const SEARCH_ARTICLES_QUERY = gql`
  query SEARCH_ARTICLES_QUERY($searchTerm: String!) {
    articles(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      title
      image
    }
  }
`;

function routeToArticle(article) {
  Router.push({
    pathname: "/articles/article",
    query: {
      id: article.id
    }
  });
}

class AutoComplete extends React.Component {
  // State
  state = {
    articles: [],
    loading: false
  };
  // OnChange auto complete
  onChange = debounce(async (e, client) => {
    this.setState({ loading: true });
    // On effectue une requête manuelle grâce à ApolloConsumer
    const response = await client.query({
      query: SEARCH_ARTICLES_QUERY,
      variables: { searchTerm: e.target.value }
    });
    this.setState({
      articles: response.data.articles,
      loading: false
    });
  }, 350);
  render() {
    resetIdCounter();
    return (
      <StyledDropdownArticleSearch>
        <Downshift
          itemToString={article => (article === null ? "" : article.title)}
          onChange={routeToArticle}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <>
                    <input
                      {...getInputProps({
                        type: "Search",
                        placeholder: "Recherchez un évènement",
                        className: this.state.loading ? "Chargement" : "",
                        onChange: e => {
                          e.persist();
                          this.onChange(e, client);
                        }
                      })}
                    />
                    <span className="inputIcon">
                      {" "}
                      <StyledSearchIcon />{" "}
                    </span>
                  </>
                )}
              </ApolloConsumer>

              {/* DROPDOWN */}
              {isOpen && (
                <StyledDropdownArticle>
                  {this.state.articles.map((article, index) => (
                    <StyledDropdownArticleItem
                      {...getItemProps({ item: article })}
                      key={article.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img width="50" src={article.image} alt={article.title} />
                      {article.title}
                    </StyledDropdownArticleItem>
                  ))}
                  {!this.state.articles.length && !this.state.loading && (
                    <StyledDropdownArticleItem>
                      Aucun résultat pour :{" " }<strong> {inputValue}</strong>
                    </StyledDropdownArticleItem>
                  )}
                </StyledDropdownArticle>
              )}
            </div>
          )}
        </Downshift>
      </StyledDropdownArticleSearch>
    );
  }
}

export default AutoComplete;
