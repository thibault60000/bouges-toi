import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";
import Link from "next/link";
import StyledPagination, { StyledLeftArrow, StyledRightArrow, StyledFindInPage } from "./styles/StyledPagination";
import Error from "./Error";
import { perPage } from "../config";

const PAGINATION_ARTICLE_QUERY = gql`
  query PAGINATION_ARTICLE_QUERY {
    articlesConnection {
      aggregate {
        count
      }
    }
  }
`;

class Pagination extends Component {
  render() {
    return (
      <Query query={PAGINATION_ARTICLE_QUERY} fetchPolicy='network-only'>
        {({ data, loading, error }) => {
          if (loading) return <p> Chargement ... </p>;
          if (error) return <Error error={error} />;
          // Nombre de pages
          const count = data.articlesConnection.aggregate.count;
          const pages = Math.ceil(count / perPage);
          const page = this.props.page;
          return (
            <StyledPagination>
              <Head>
                <title>
                  Bouge toi ! - Derniers évènements : Page {page} sur {pages}
                </title>
              </Head>
              {/* Précédent */}
              <Link
                prefetch
                href={{
                  pathname: "/articles/articles",
                  query: { page: page - 1 }
                }}
              >
                <a className="previous" aria-disabled={page <= 1}> <StyledLeftArrow /> Précédent </a>
              </Link>
              {/* Page actuelle */}
              <p className="pageNumber">
                {this.props.page} sur {pages}
              </p>
              {/* Nombre d'articles */}
              <p className="total">{count} évènements au total </p>
              {/* Suivant */}
              <Link
                prefetch
                href={{
                  pathname: "/articles/articles",
                  query: { page: page + 1 }
                }}
              >
                <a className="next" aria-disabled={page >= pages}> Suivant <StyledRightArrow /> </a>
              </Link>
            </StyledPagination>
          );
        }}
      </Query>
    );
  }
}

export default Pagination;
export { PAGINATION_ARTICLE_QUERY };