import React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import classnames from "classnames";
import Link from "next/link";
import moment from "moment";
import ReactTooltip from "react-tooltip";
moment.locale("fr");

import StyledArticle, { StyledMap } from "../styles/StyledArticle";
import DeleteArticleButton from "./DeleteArticleButton";
import JoinArticleButton from "./JoinArticleButton";
import ExitArticlebutton from "./ExitArticlebutton";

import {
  ExitIcon,
  EditAltIcon,
  DeleteForeverIcon,
  EnterIcon
} from "../styles/Icons/ArticleIcons";

const propTypes = {
  article: PropTypes.object.isRequired
};

function Article(props) {
  const { article, me } = props;
  const router = useRouter();
  const goToArticle = e => {
    e.preventDefault();
    router.push({
      pathname: "/articles/article",
      query: { id: article.id }
    });
  };
  return (
    <StyledArticle onClick={goToArticle}>
      <div className="firstInformations">
        {article.image ? <img src={article.image} alt={article.title} /> : null}
        <div className="articleInformations">
          <h4>
            {/* Titre  */}
            {article.title}
            {/* <Link
                href={{
                  pathname: "/articles/article",
                  query: { id: article.id }
                }}
              >
                <a>
                  
                  <StylePageView />
                </a>
              </Link> */}
          </h4>
          {/* ARTICLE INFORMATIONS */}
          <p className="description"> {article.description}</p>
          <p
            className="nbPersons"
            className={classnames("nbPersons", {
              "is-full": article.nbPersons === article.users.length
            })}
            data-tip
            data-for={`${article.id}-nbPersonsTooltip`}
          >
            {article.users.length} / {article.nbPersons} participants
          </p>
          {/* Tooltip Images Users */}
          <ReactTooltip
            className="tooltip"
            type="light"
            id={`${article.id}-nbPersonsTooltip`}
          >
            <ul>
              {article.users &&
                article.users.map(user => (
                  <li key={`${user.id}-${article.id}`}>
                    <img src={user.picture} alt={`${user.name}-${user.id}`} />
                  </li>
                ))}
            </ul>
          </ReactTooltip>
        </div>
      </div>
      <div className="secondInformations">
        {/* Dates */}
        <div className="articleMoreInformations">
          <p>
            Démarre le{" "}
            <strong>{moment(article.begin_date).format("Do MMMM YYYY")}</strong>
          </p>
          <p>
            Jusqu'au{" "}
            <strong>{moment(article.end_date).format("Do MMMM YYYY")}</strong>
          </p>
          {/* Adresse */}
          <p className="adresse">
            {article.adresse}
            <Link
              href={`https://www.google.com/maps/place/${article.adresse.replace(
                " ",
                "+"
              )}/`}
            >
              <a className="localisation" target="_blank">
                <StyledMap />
              </a>
            </Link>
          </p>
          {/* UPDATED DATE */}
          <p className="createdEditedBy">
            {article.updatedAt !== article.createdAt ? (
              <span>
                Mise à jour le{" "}
                {moment(article.updatedAt).format("Do MMMM YYYY")} par
                <Link
                  href={{
                    pathname: "/userPage",
                    query: article.user.id
                  }}
                >
                  <a> {article.user.name + article.user.surname} </a>
                </Link>
              </span>
            ) : (
              /* CREATION DATE */
              <span>
                Créé le : {moment(article.createdAt).format("Do MMMM YYYY")} par{" "}
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
        </div>
        {/*  Boutons d'action */}
        <div className="actionButtons">
          {/* Si je suis le créateur de l'article */}
          {me && me.id === article.user.id && (
            <>
              <Link
                href={{
                  pathname: "/articles/updateArticlePage",
                  query: { id: article.id }
                }}
              >
                <a>
                  {" "}
                  <EditAltIcon />{" "}
                </a>
              </Link>
              <DeleteArticleButton id={article.id}>
                <DeleteForeverIcon />
              </DeleteArticleButton>
            </>
          )
          /* Si je ne suis pas le créateur, est ce que je fais parti des personnes inscrites */
          }
          {me && me.id !== article.user.id ? (
            article.users.some(u => u.id === me.id) ? (
              <ExitArticlebutton article={article}>
                {" "}
                <ExitIcon />
              </ExitArticlebutton>
            ) : (
              /* Sinon je peux rejoindre l'article */
              <JoinArticleButton article={article}>
                {" "}
                <EnterIcon />
              </JoinArticleButton>
            )
          ) : null}
        </div>
      </div>
    </StyledArticle>
  );
}

Article.propTypes = propTypes;

export default Article;
