import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "../Error";
import styled from "styled-components";
import Head from "next/head";

const StyledReadArticle = styled.div`
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
const READ_ARTICLE_QUERY = gql`
  query READ_ARTICLE_QUERY($id: ID!) {
    article(where: { id: $id }) {
      id
      title
      description
      greatImage
    }
  }
`;

export default class ReadArticle extends Component {
  render() {
    return (
      <div>
        <Query query={READ_ARTICLE_QUERY} variables={{ id: this.props.id }}>
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p> Chargement... </p>;
            const article = data.article;
            return (
              <StyledReadArticle>
                <Head>
                  <title> Mon Site - {article.title}</title>
                </Head>
                <img src={article.greatImage} alt={article.title} />
                <div className="informations">
                  <h2> Article : {article.title}</h2>
                  <p> {article.description}</p>
                </div>
              </StyledReadArticle>
            );
          }}
        </Query>
      </div>
    );
  }
}
