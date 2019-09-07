import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Category from "./Category";

const CATEGORIES_QUERY = gql`
  query CATEGORIES_QUERY {
    categories {
      id
      title
      rubrique {
        title
      }
    }
  }
`;

const StyledCategoriesContainer = styled.div`
  text-align: center;
`;
const StyledCategoriesList = styled.ul`
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  li {
    list-style: none;
  }
`;

class Categories extends Component {
  render() {
    return (
      <StyledCategoriesContainer>
        <h3> Liste des categories </h3>
        <Query query={CATEGORIES_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p> Chargement ... </p>;
            if (error) return <p> Erreur : {error.message} </p>;
            return (
              <StyledCategoriesList>
                {data.categories.map(category => (
                  <Category category={category} key={category.id} />
                ))}
              </StyledCategoriesList>
            );
          }}
        </Query>
      </StyledCategoriesContainer>
    );
  }
}

export default Categories;
export { CATEGORIES_QUERY };
