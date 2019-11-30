import React, { Component } from "react";
import gql from "graphql-tag";

import Link from "next/link";
import Head from "next/head";
import { Query } from "react-apollo";

import Error from "../Error";

const READ_USER_QUERY = gql`
  query READ_USER_QUERY($id: ID!) {
    user(where: { id: $id }) {
      id
      email
      name
      surname
      permissions
      picture
      articles {
        id
        title
        description
        image
        price
        nbPersons
      }
      cart {
        quantity
      }
      memberOf {
        id
        title
        description
        image
      }
    }
  }
`;

class ReadUser extends Component {
  render() {
    return (
      <Query query={READ_USER_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          /* Si Erreur ou chargement */
          if (error) return <Error error={error} />;
          if (loading) return <p> Chargement... </p>;
          const user = data.user;
          return (
            <>
              {/* Titre */}
              <h2 style={{ fontSize: "3.8rem", textTransform: "Capitalize" }}>
                {user.name && user.name} {user.surname && user.surname}
              </h2>
              {/* Photo */}
              <img
                style={{ height: "18rem", borderRadius: "3px" }}
                src={user.picture}
                alt="Photo de profil"
              />
              {/* Email */}
              <p>
                <strong> Email : </strong>
                <span>{user.email && user.email}</span>
              </p>
              {/* Inscrit dans les articles */}
              <p>
                <strong>Membre de </strong>{" "}
                <span> {user.memberOf.length} évènements </span>
              </p>
              <ul style={{ display: "flex" }}>
                {user.memberOf.map(article => (
                  <li
                    style={{
                      listStyle: "none",
                      fontWeight: "bold",
                      margin: "0 0.5rem",
                      border: "1px solid lightgrey",
                      padding: "0.5rem 0.9rem",
                      borderRadius: "3px"
                    }}
                    key={article.id + "memberOf"}
                  >
                    <Link
                      href={{
                        pathname: "/articles/article",
                        query: { id: article.id }
                      }}
                    >
                      <a>
                        <span style={{ display: "block" }}>
                          {article.title}{" "}
                        </span>
                        <img
                          style={{ height: "5rem" }}
                          src={article.image}
                          alt={article.title}
                        />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Créateur des articles */}
              <p>
                <strong>Créateur de </strong>{" "}
                <span>{user.articles.length} évènements </span>{" "}
              </p>
              <ul style={{ display: "flex" }}>
                {user.articles.map(article => (
                  <li
                    style={{
                      listStyle: "none",
                      fontWeight: "bold",
                      margin: "0 0.5rem",
                      border: "1px solid lightgrey",
                      padding: "0.5rem 0.9rem",
                      borderRadius: "3px"
                    }}
                    key={article.id + "joinedArticle"}
                  >
                    <Link
                      href={{
                        pathname: "/articles/article",
                        query: { id: article.id }
                      }}
                    >
                      <a>
                        <span style={{ display: "block" }}>
                          {article.title}{" "}
                        </span>
                        <img
                          style={{ height: "5rem" }}
                          src={article.image}
                          alt={article.title}
                        />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <hr />
              <p>
                {/* Est ADMIN de l'application */}
                {user.permissions.includes("ADMIN") && (
                  <em> Administrateur de l'application </em>
                )}
              </p>
              <p>
                {/* Exclut de la création d'article */}
                {!user.permissions.includes("ARTICLECREATE") && (
                  <em> N'est plus autorisé à créer d'articles </em>
                )}
              </p>
              <p>
                {/* Exclut de la création d'article */}
                {!user.permissions.includes("ARTICLEUPDATE") && (
                  <em> N'est plus autorisé à mettre à jour ses articles </em>
                )}
              </p>
              <p>
                {/* Exclut de la création d'article */}
                {!user.permissions.includes("ARTICLEDELETE") && (
                  <em> N'est plus autorisé à supprimer ses articles </em>
                )}
              </p>
              <p>
                {/* Est membre PREMIUM */}
                {user.permissions.includes("PREMIUM") && (
                  <em> Dispose de l'option Premium </em>
                )}
              </p>
              {/* Modifier son mot de passe */}
              <p>
                <Link href="/requestResetPage">
                  <a>
                    <strong style={{ textDecoration: "underline" }}>
                      {" "}
                      Envoyer une demande de réinitilisation de mot de passe
                    </strong>
                  </a>
                </Link>
              </p>
            </>
          );
        }}
      </Query>
    );
  }
}

export default ReadUser;
export { READ_USER_QUERY };
