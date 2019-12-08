import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { adopt } from "react-adopt";
import gql from "graphql-tag";
import isEmpty from "lodash.isempty";

// Styled
import {
  StyledArticlesList,
  StyledPageSlogan,
  StyledTimeIcon
} from "../styles/StyledArticle";

import Article from "../Articles/Article";
import LastArticlesPagination from "../Paginations/LastArticlesPagination";
import { perPage } from "../../config";

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

class LastArticlesSearch extends Component {
  state = {};
  render() {
    const { me, page } = this.props;
    return (
      <Query
        query={ARTICLES_QUERY}
        variables={{
          skip: page * perPage - perPage
        }}
      >
        {({ data, error, loading }) => {
          const { articles } = data;
          return (
            <>
              {/* Title */}
              <StyledPageSlogan>
                <StyledTimeIcon /> Les derniers évènements
              </StyledPageSlogan>
              {/* Pagination 1 */}
              <LastArticlesPagination page={page} />
              {/* Liste d'articles  */}
              <StyledArticlesList>
                {articles.map(article => (
                  /* Article */
                  <Article me={me} article={article} key={article.id} />
                ))}
              </StyledArticlesList>
              {/* Pagination 2*/}
              <LastArticlesPagination page={page} />
            </>
          );
        }}
      </Query>
    );
  }
}

export default LastArticlesSearch;
export { ARTICLES_QUERY };
