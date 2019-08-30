import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "../Error";
import styled from "styled-components";
import Head from "next/head";

const StyledReadRubrique = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 2rem auto;
  box-shadow: ${props => props.theme.boxS};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
      width: 100%;
      height: 100%;
      object-fit: contain;
  }
  .informations {
      margin: 2.5rem;
      font-size: 1.8rem;
  }
`;
const READ_RUBRIQUE_QUERY = gql`
  query READ_RUBRIQUE_QUERY($id: ID!) {
    rubrique(where: { id: $id }) {
      id
      title
      image
    }
  }
`;

export default class ReadRubrique extends Component {
  render() {
    return (
      <div>
        <Query query={READ_RUBRIQUE_QUERY} variables={{ id: this.props.id }}>
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p> Chargement... </p>;
            const rubrique = data.rubrique;
            return (
              <StyledReadRubrique>
                <Head>
                  <title> Bouges toi ! Sortie : {rubrique.title}</title>
                </Head>
                <img src={rubrique.image} alt={rubrique.title} />
                <div className="informations">
                  <h2> Rubrique : {rubrique.title}</h2>
                  <p> {rubrique.description}</p>
                </div>
              </StyledReadRubrique>
            );
          }}
        </Query>
      </div>
    );
  }
}
