import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import moment from "moment";
import ReactTooltip from "react-tooltip";
moment.locale("fr");

import StyledArticle, {
  StylePageView,
  StyledMap
} from "../styles/StyledArticle";
import StyledTitle from "../styles/StyledTitle";
import DeleteArticleButton from "./DeleteArticleButton";
import JoinArticleButton from "./JoinArticleButton";
import ExitArticlebutton from "./ExitArticlebutton";

const propTypes = {
  article: PropTypes.object.isRequired
};

export class Article extends Component {
  render() {
    const { article } = this.props;
    return (
      <StyledArticle>
        {article.image ? <img src={article.image} alt={article.title} /> : null}
        <div className="articleInformations">
          <StyledTitle>
            {/* Titre  */}
            <Link
              href={{
                pathname: "/articles/article",
                query: { id: article.id }
              }}
            >
              <a>
                {article.title} <StylePageView />
              </a>
            </Link>
          </StyledTitle>
          {/* ARTICLE INFORMATIONS */}
          <p className="description"> {article.description}</p>
          <p className="nbPersons" data-tip data-for={`${article.id}-nbPersonsTooltip`}>
            {article.users.length} / {article.nbPersons} participants
          </p>
          {/* Tooltip Images Users */}
          <ReactTooltip className="tooltip" type="light" id={`${article.id}-nbPersonsTooltip`}>
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
        {/* Dates */}
        <div className="articleMoreInformations">
          <p>
            Démarre le
            <strong>{moment(article.begin_date).format("Do MMMM YYYY")}</strong>
          </p>
          <p>
            Jusqu'au
            <strong>{moment(article.end_date).format("Do MMMM YYYY")}</strong>
          </p>
          {/* Adresse */}
          <p className="adresse">{article.adresse}</p>
          <Link
            href={`https://www.google.com/maps/place/${article.adresse.replace(
              " ",
              "+"
            )}/`}
          >
            <a className="localisation" target="_blank">
              Localiser <StyledMap />
            </a>
          </Link>
          {/* UPDATED DATE */}
          <p className="createdEditedBy">
            {article.updatedAt !== article.createdAt ? (
              <span>
                Mise à jour le
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
                  <a>{article.user.name + article.user.surname} </a>
                </Link>
              </span>
            )}
          </p>
        </div>
        {/*  Boutons d'action */}
        <div className="actionButtons">
          {/* Si je suis le créateur de l'article */}
          {this.props.me && this.props.me.id === article.user.id && (
            <>
              <Link
                href={{
                  pathname: "/articles/updateArticlePage",
                  query: { id: article.id }
                }}
              >
                <a> Modifier </a>
              </Link>
              <DeleteArticleButton id={article.id}>
                Supprimer
              </DeleteArticleButton>
            </>
          )
          /* Si je ne suis pas le créateur, est ce que je fais parti des personnes inscrites */
          }
          {
          (this.props.me && 
          this.props.me.id !== article.user.id ) ?
          article.users.some(u => u.id === this.props.me.id) ? (
            <ExitArticlebutton article={article}>Quitter</ExitArticlebutton>
          ) : ( /* Sinon je peux rejoindre l'article */
            <JoinArticleButton article={article}>Rejoindre</JoinArticleButton>
          ) : null}
        </div>
      </StyledArticle>
    );
  }
}

Article.propTypes = propTypes;

export default Article;
