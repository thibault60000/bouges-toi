import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

// GraphQL
import gql from "graphql-tag";
import { Query } from "react-apollo";

// Moment
import moment from "moment";
moment.locale("fr");

// Components
import Error from "../Error";
import DeleteArticleButton from "./DeleteArticleButton";
import JoinArticleButton from "./JoinArticleButton";
import ExitArticlebutton from "./ExitArticlebutton";
import ChatArticle from "./ChatArticle";

// Styled
import {
  StyledReadArticle,
  StyledTitleReadArticle,
  PreviousIcon,
  StyledBackButton
} from "../styles/StyledReadArticle";

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

function ReadArticle(props) {
  const router = useRouter();
  const previous = () => {
    router.push(`/`);
  };
  return (
    <Query query={READ_ARTICLE_QUERY} variables={{ id: props.id }}>
      {({ error, loading, data }) => {
        if (error) return <Error error={error} />;
        if (loading) return <p> Chargement... </p>;
        const article = data.article;
        return (
          <>
            {/* Titre */}
            <StyledBackButton onClick={previous}>
              <PreviousIcon />
            </StyledBackButton>
            <StyledTitleReadArticle
              style={{ fontSize: "3.8rem", textTransform: "Capitalize" }}
            >
              {article.title}
            </StyledTitleReadArticle>

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
                            pathname: "/users/userPage",
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
                  {props.me && props.me.id === article.user.id && (
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
                        <DeleteArticleButton id={article.id}>
                          {" "}
                          Supprimer{" "}
                        </DeleteArticleButton>
                      </li>
                    </>
                  )}
                  {props.me && props.me.id !== article.user.id ? (
                    article.users.some(u => u.id === props.me.id) ? (
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
                          {article.user.name + " " + article.user.surname}{" "}
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
                        <a>{article.user.name + " " + article.user.surname} </a>
                      </Link>
                    </span>
                  )}
                </p>
              </footer>
            </StyledReadArticle>
            <ChatArticle article={article} />
          </>
        );
      }}
    </Query>
  );
}

export default ReadArticle;
export { READ_ARTICLE_QUERY };
