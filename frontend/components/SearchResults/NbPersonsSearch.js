import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { adopt } from "react-adopt";
import gql from "graphql-tag";
import isEmpty from "lodash.isempty";

// Styled
import {
  StyledArticlesList,
  StyledPageSlogan
} from "../styles/StyledArticle";

import Article from "../Articles/Article";
import ArticleNbPersonsPagination, { PAGINATION_ARTICLE_NB_PERSONS_QUERY } from "../Paginations/ArticleNbPersonsPagination";
import { perPage } from "../../config";

const SEARCH_ARTICLES_QUERY_NB_PERSONS = gql`
  query SEARCH_ARTICLES_QUERY_NB_PERSONS($numberMin: Int, $numberMax: Int, $skip: Int = 0, $first: Int = ${perPage}) {
    articles(
      where: {
        AND: [{ nbPersons_gte: $numberMin }, { nbPersons_lte: $numberMax }]
      }, first: $first, skip: $skip, orderBy: createdAt_DESC
    ) {
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

class NbPersonsSearch extends Component {
  state = {};
  render() {
    const { me, page, min, max } = this.props;
    return (
      <Query
        query={SEARCH_ARTICLES_QUERY_NB_PERSONS}
        variables= {{
            numberMin: min,
            numberMax: max,
            skip: page * perPage - perPage
          }}
      >
        {({ data, error, loading }) => {
          const { articles } = data;
          return (
            <>
              {/* Title */}
              <StyledPageSlogan>
                Filtre par nombre de personnes
              </StyledPageSlogan>
              {/* Pagination 1 */}
              <ArticleNbPersonsPagination min={min} max={max} page={page} />

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
              <ArticleNbPersonsPagination min={min} max={max} page={page} />
            </>
          );
        }}
      </Query>
    );
  }
}

export default NbPersonsSearch;
export { SEARCH_ARTICLES_QUERY_NB_PERSONS };
