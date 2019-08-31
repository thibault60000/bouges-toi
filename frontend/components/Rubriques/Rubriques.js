import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Link from "next/link";

const RUBRIQUES_QUERY = gql`
  query RUBRIQUES_QUERY {
    rubriques {
      id
      title
      image
      user {
        id
      }
    }
  }
`;

class Rubriques extends Component {
  render() {
    return (
      <div>
        <h2> Gestion des rubriques </h2>
        <Link href="/rubriques/createRubriquePage">
          <button> Créer une rubrique </button>
        </Link>
        <h3> Liste des rubriques </h3>
        <Query query={RUBRIQUES_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p> Chargement ... </p>;
            if (error) return <p> Erreur : {error.message} </p>;
            return (
              <ul>
                {data.rubriques.map(rubrique => (
                  <li key={rubrique.id}>
                    <img
                      width="80px"
                      src={rubrique.image}
                      alt={rubrique.title}
                    />
                    <Link
                      href={{
                        pathname: `/rubriques/rubrique`,
                        query: rubrique.id
                      }}
                    >
                      <a>{rubrique.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Rubriques;
export { RUBRIQUES_QUERY };
