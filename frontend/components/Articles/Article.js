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
          <p className="nbPersons" data-tip data-for="nbPersonsTooltip">
            {article.users.length} / {article.nbPersons} participants
          </p>
          <ReactTooltip className="tooltip" type="light" id="nbPersonsTooltip">
            <ul>
              {article.users &&
                article.users.map(user => (
                  <li key={`${user.id}${article.id}`}>
                    <img src={user.picture} alt={user.name} />
                  </li>
                ))}
            </ul>
          </ReactTooltip>
        </div>
        <div className="articleMoreInformations">
          <p>
            Démarre le
            <strong>{moment(article.begin_date).format("Do MMMM YYYY")}</strong>
          </p>
          <p>
            Jusqu'au
            <strong>{moment(article.end_date).format("Do MMMM YYYY")}</strong>
          </p>
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
          {this.props.me &&
            (this.props.me.id === article.user.id ? (
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
            ) : (
              <JoinArticleButton article={article}> Rejoindre </JoinArticleButton>
            ))}
        </div>
      </StyledArticle>
    );
  }
}

Article.propTypes = propTypes;

export default Article;