import React, { Component } from "react";
import gql from "graphql-tag";
import moment from "moment";
moment.locale("fr");

import Link from "next/link";
import styled from "styled-components";
import Head from "next/head";
import { Query } from "react-apollo";

import Error from "../Error";
import DeleteArticleButton from "./DeleteArticleButton";
import JoinArticleButton from "./JoinArticleButton";
import ExitArticlebutton from "./ExitArticlebutton";

const StyledReadArticle = styled.div`
  padding: 1.5rem;
  max-width: ${props => props.theme.maxWidth};
  margin: 2rem auto;
  box-shadow: ${props => props.theme.boxS};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  img {
    object-fit: cover;
  }
  section.articleImg {
    width: 30%;
    padding: 2.7rem;
    img {
      max-width: 100%;
      border-radius: 3px;
    }
  }
  section.actions {
    display: block;
    padding: 0.5rem;
    width: 100%;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      li {
        list-style: none;
        margin: 0.5rem 1rem;
        > * {
          border: none;
          padding: 1.6rem 1.6rem;
          font-weight: bold;
          font-size: 1.4rem;
          color: #454b73;
          background-color: initial;
          border-radius: 5px;
          :hover {
            cursor: pointer;
            opacity: 0.8;
          }
          &.exit {
            background-color: #4d70b9;
            color: white;
          }
          &[disabled] {
            background-color: #8c8c8c;
            color: #c3c3c3;
            :hover {
              opacity: 1;
              cursor: default;
            }
          }
        }
      }
    }
  }

  section.description {
    width: 40%;
    padding-right: 5rem;
    p.desc {
      margin: 0.2rem 0 2rem;
      font-style: italic;
    }
    div.articleDates {
      p {
        margin: 0;
        &.adresse {
          margin-top: 1.5rem;
          color: #ff460f;
          font-weight: bold;
        }
      }
    }
  }
  section.participants {
    width: 30%;

    p.nbParticipants {
      background-color: rgb(69, 75, 115);
      color: white;
      font-weight: bold;
      border-radius: 15px;
      display: inline-block;
      font-size: 1.5rem;
      padding: 0.5rem 1.7rem;
      margin-top: 2.2rem;
    }
    ul.participantsList {
      margin: 1.4rem 0 0;
      padding: 0;
      margin: 1.4rem 0 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      li {
        list-style: none;
        margin: 0.5rem;
        text-align: center;
        overflow: hidden;
        max-width: 100px;
        img {
          width: 80px;
          border-radius: 5px;
          height: 75px;
        }
        span {
          display: inline-block;
          font-weight: bold;
          line-height: 1.3rem;
          margin: 0.2rem 0 0.5rem;
          word-break: break-word;
          text-overflow: ellipsis;
        }
      }
    }
  }
  footer {
    display: block;
    width: 100%;
    background-color: #f3f1f1;
    border-radius: 2px;
    text-align: right;
    padding-right: 1rem;
    p {
      margin: 1.4rem 0;
      a,
      strong {
        font-weight: bold;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
`;
const READ_ARTICLE_QUERY = gql`
  query READ_ARTICLE_QUERY($id: ID!) {
    article(where: { id: $id }) {
      id
      title
      description
      greatImage
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

export default class ReadArticle extends Component {
  render() {
    return (
      <Query query={READ_ARTICLE_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p> Chargement... </p>;
          const article = data.article;
          return (
            <>
              {/* Titre */}
              <h2 style={{ fontSize: "3.8rem", textTransform: "Capitalize" }}>
                {article.title}
              </h2>

              {/* Article */}
              <StyledReadArticle>
                <Head>
                  <title> Bouge toi ! Sortie : {article.title}</title>
                </Head>
                {/* Image */}
                <section className="articleImg">
                  <img src={article.greatImage} alt={article.title} />
                </section>
                {/* Descriptif */}
                <section className="description">
                  <h1> Description de l'évènement </h1>
                  <p className="desc"> {article.description}</p>
                  <div className="articleDates">
                    <p>
                      Démarre le{" "}
                      <strong>
                        {moment(article.begin_date).format("Do MMMM YYYY")}
                      </strong>
                    </p>
                    <p>
                      Jusqu'au{" "}
                      <strong>
                        {moment(article.end_date).format("Do MMMM YYYY")}
                      </strong>
                    </p>
                    <p className="adresse">{article.adresse}</p>
                  </div>
                </section>
                {/* Participants */}
                <section className="participants">
                  <p className="nbParticipants">
                    {article.users.length} / {article.nbPersons} participants{" "}
                  </p>
                  <ul className="participantsList">
                    {article.users &&
                      article.users.map(user => (
                        <li key={`${user.id}-${article.id}`}>
                          <Link
                            href={{
                              pathname: "/Users/UserPage",
                              query: { id: user.id }
                            }}
                          >
                            <a>
                              <img
                                width="80px"
                                src={user.picture}
                                alt={`${user.name}-${user.id}`}
                              />
                              <span>
                                {user.name} {user.surname}
                              </span>
                            </a>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </section>
                {/*  Boutons d'action */}
                <section className="actions">
                  <ul>
                    {/* Si je suis le créateur de l'article */}
                    {this.props.me && this.props.me.id === article.user.id && (
                      <>
                        {/* MISE A JOUR */}
                        <li>
                          <Link
                            href={{
                              pathname: "/articles/updateArticlePage",
                              query: { id: article.id }
                            }}
                          >
                            <a> Modifier </a>
                          </Link>
                        </li>
                        {/* SUPPRESSION */}
                        <li>
                          <DeleteArticleButton id={article.id} />
                        </li>
                      </>
                    )}
                    {this.props.me && this.props.me.id !== article.user.id ? (
                      article.users.some(u => u.id === this.props.me.id) ? (
                        /* QUITTER */
                        <li>
                          <ExitArticlebutton article={article}>
                            {" "}
                            Quitter l'évènement{" "}
                          </ExitArticlebutton>
                        </li>
                      ) : (
                        /*  REJOINDRE */
                        <li>
                          <JoinArticleButton article={article}>
                            {" "}
                            Rejoindre l'évènement
                          </JoinArticleButton>
                        </li>
                      )
                    ) : null}
                  </ul>
                </section>
                {/* Article Footer */}
                <footer>
                  {/* UPDATED DATE */}
                  <p className="createdEditedBy">
                    {article.updatedAt !== article.createdAt ? (
                      <span>
                        Mise à jour le{" "}
                        <strong>
                          {moment(article.updatedAt).format("Do MMMM YYYY")}{" "}
                        </strong>
                        par{" "}
                        <Link
                          href={{
                            pathname: "/userPage",
                            query: article.user.id
                          }}
                        >
                          <a>
                            {" "}
                            {article.user.name +
                              " " +
                              article.user.surname}{" "}
                          </a>
                        </Link>
                      </span>
                    ) : (
                      /* CREATION DATE */
                      <span>
                        Créé le :{" "}
                        <strong>
                          {moment(article.createdAt).format("Do MMMM YYYY")}{" "}
                        </strong>
                        par{" "}
                        <Link
                          href={{
                            pathname: "/userPage",
                            query: article.user.id
                          }}
                        >
                          <a>
                            {article.user.name + " " + article.user.surname}{" "}
                          </a>
                        </Link>
                      </span>
                    )}
                  </p>
                </footer>
              </StyledReadArticle>
            </>
          );
        }}
      </Query>
    );
  }
}
