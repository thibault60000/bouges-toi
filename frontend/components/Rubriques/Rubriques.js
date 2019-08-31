import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Link from "next/link";
import Rubrique from "./Rubrique";

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

const StyledRubriquesContainer = styled.div`
  text-align: center;
`;
const StyledRubriquesList = styled.ul`
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  li {
    list-style: none;
  }
`;

class Rubriques extends Component {
  render() {
    return (
      <StyledRubriquesContainer>
        <h2> Gestion des rubriques </h2>
        <Link href="/rubriques/createRubriquePage">
          <button>  + Créer une rubrique </button>
        </Link>
        <h3> Liste des rubriques </h3>
        <Query query={RUBRIQUES_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p> Chargement ... </p>;
            if (error) return <p> Erreur : {error.message} </p>;
            return (
              <StyledRubriquesList>
                {data.rubriques.map(rubrique => (
                  <Rubrique rubrique={rubrique} key={rubrique.id} />
                ))}
              </StyledRubriquesList>
            );
          }}
        </Query>
      </StyledRubriquesContainer>
    );
  }
}

export default Rubriques;
export { RUBRIQUES_QUERY };
