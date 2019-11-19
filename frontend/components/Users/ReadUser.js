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
        image
      }
      memberOf {
        id
      }
    }
  }
`;

class ReadUser extends Component {
  render() {
    return (
      <Query query={READ_USER_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p> Chargement... </p>;
          const user = data.user;
          return (
            <>
              {/* Titre */}
              <h2 style={{ fontSize: "3.8rem", textTransform: "Capitalize" }}>
                {user.name && user.name} {user.surname && user.surname}
              </h2>
              <img
                style={{ height: "18rem", borderRadius: "3px" }}
                src={user.picture}
                alt="Photo de profil"
              />
              <p>
                {" "}
                <strong> Email : </strong>
                <span>{user.email && user.email}</span>
              </p>
              <p>
                <strong>Membre de </strong>{" "}
                <span> {user.memberOf.length} évènements </span>
              </p>
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
              {user.permissions.includes("ADMIN") && (
                <em> Administrateur de l'application </em>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default ReadUser;
export { READ_USER_QUERY };
