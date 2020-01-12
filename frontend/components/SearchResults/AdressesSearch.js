import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { StyledArticlesList, StyledPageSlogan } from "../styles/StyledArticle";

import Article from "../Articles/Article";
import ArticleAdressesPagination from "../Paginations/ArticleAdressesPagination";
import { perPage } from "../../config";

const SEARCH_ARTICLES_QUERY_ADRESSES = gql`
  query SEARCH_ARTICLES_QUERY_ADRESSES($searchTerm: String, $skip: Int = 0, $first: Int = ${perPage}) {
    articles(where: { AND: [{ adresse_contains: $searchTerm }]}, first: $first, skip: $skip, orderBy: createdAt_DESC) {
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

class AdressesSearch extends Component {
  state = {};
  render() {
    const { me, page, adresses, clearFilter } = this.props;
    return (
      <Query
        query={SEARCH_ARTICLES_QUERY_ADRESSES}
        variables={{
          searchTerm: adresses,
          skip: page * perPage - perPage
        }}
      >
        {({ data, error, loading }) => {
          const { articles } = data;
          if (error) return <p>Aucun article pour cette adresse </p>;
          if (loading) return <p> Chargement ... </p>;
          return (
            <>
              {/* Title */}
              <StyledPageSlogan>Filtre par Adresse</StyledPageSlogan>
              <p>
                <strong> Critère choisi : </strong> " {adresses} "
                <button onClick={clearFilter}> X </button>
              </p>

              {/* Pagination 1 */}
              <ArticleAdressesPagination adresses={adresses} page={page} />

              {/* Liste d'articles */}
              <StyledArticlesList>
                {articles.map(article => (
                  /* Article */
                  <Article
                    me={me}
                    article={article}
                    key={article.id + "findArticles"}
                  />
                ))}
              </StyledArticlesList>
              {/* Pagination 2*/}
              <ArticleAdressesPagination adresses={adresses} page={page} />
            </>
          );
        }}
      </Query>
    );
  }
}

export default AdressesSearch;
export { SEARCH_ARTICLES_QUERY_ADRESSES };
