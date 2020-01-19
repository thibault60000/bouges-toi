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

const PAGINATION_ARTICLE_NB_PERSONS_QUERY = gql`
  query PAGINATION_ARTICLE_NB_PERSONS_QUERY($numberMin: Int, $numberMax: Int) {
    articlesConnection(
      where: {
        AND: [{ nbPersons_gte: $numberMin }, { nbPersons_lte: $numberMax }]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

class PaginationNbPersons extends Component {
  render() {
    const { min, max, page } = this.props;
    return (
      <Query
        query={PAGINATION_ARTICLE_NB_PERSONS_QUERY}
        variables={{
          numberMin: parseInt(min, 10),
          numberMax: parseInt(max, 10)
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
                  <StyledLeftArrow /> Préc.{" "}
                </a>
              </Link>
              {/* Page actuelle */}
              <p className="pageNumber">
                Page {this.props.page} / {pages}
              </p>
              {/* Nombre d'articles */}
              <p className="total">{count} Events. </p>
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
                  Suiv. <StyledRightArrow />{" "}
                </a>
              </Link>
            </StyledPagination>
          );
        }}
      </Query>
    );
  }
}

export default PaginationNbPersons;
export { PAGINATION_ARTICLE_NB_PERSONS_QUERY };
