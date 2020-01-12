import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";
import Link from "next/link";
import StyledPagination, {
  StyledLeftArrow,
  StyledRightArrow
} from "../styles/StyledPagination";
import Error from "../Error";
import { perPage } from "../../config";

const PAGINATION_ARTICLE_ADRESSES_QUERY = gql`
  query PAGINATION_ARTICLE_ADRESSES_QUERY($searchTerm: String) {
    articlesConnection(where: { AND: [{ adresse_contains: $searchTerm }] }) {
      aggregate {
        count
      }
    }
  }
`;

class PaginationAdresses extends Component {
  render() {
    const { adresses, page } = this.props;
    return (
      <Query
        query={PAGINATION_ARTICLE_ADRESSES_QUERY}
        variables={{
            searchTerm: adresses
        }}
        fetchPolicy="network-only"
      >
        {({ data, loading, error }) => {
          if (loading) return <p> Chargement ... </p>;
          if (error) return <Error error={error} />;
          // Nombre de pages
          const count = data.articlesConnection.aggregate.count;
          const pages = Math.ceil(count / perPage);
          return (
            <StyledPagination>
              <Head>
                <title>
                  Bouge toi ! - Page {page} sur {pages}
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
                <a className="previous" aria-disabled={page <= 1}>
                  {" "}
                  <StyledLeftArrow /> Précédent{" "}
                </a>
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
                <a className="next" aria-disabled={page >= pages}>
                  {" "}
                  Suivant <StyledRightArrow />{" "}
                </a>
              </Link>
            </StyledPagination>
          );
        }}
      </Query>
    );
  }
}

export default PaginationAdresses;
export { PAGINATION_ARTICLE_ADRESSES_QUERY };
