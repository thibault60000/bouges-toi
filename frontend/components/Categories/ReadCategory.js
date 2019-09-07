import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "../Error";
import styled from "styled-components";
import Head from "next/head";

const StyledReadCategory = styled.div`
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
const READ_CATEGORY_QUERY = gql`
  query READ_CATEGORY_QUERY($id: ID!) {
    category(where: { id: $id }) {
      id
      title
      rubrique {
        title
      }
    }
  }
`;

class ReadCategory extends Component {
  render() {
    return (
      <div>
        <Query query={READ_CATEGORY_QUERY} variables={{ id: this.props.id }}>
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p> Chargement... </p>;
            const category = data.category;
            return (
              <StyledReadCategory>
                <Head>
                  <title> Bouges toi ! Category : {category.title}</title>
                </Head>
                <div className="informations">
                  <h2> Category : {category.title}</h2>
                  <p> Appartient à la rubrique : {category.rubrique.title}</p>
                </div>
              </StyledReadCategory>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ReadCategory;
