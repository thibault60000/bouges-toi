import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import moment from "moment";
moment.locale("fr");

import StyledArticle from "../styles/StyledArticle";
import StyledTitle from "../styles/StyledTitle";
import DeleteArticleButton from "./DeleteArticleButton";

const propTypes = {
  article: PropTypes.object.isRequired
};

export class Article extends Component {
  render() {
    const { article } = this.props;
    console.log(article);
    return (
      <StyledArticle>
        <p className={"price" + (article.price === 0 ? "" : " notFree")}>
          {article.price === 0 ? "Gratuit" : article.price + " € "}
        </p>
        {article.image ? <img src={article.image} alt={article.title} /> : null}
        <StyledTitle>
          {/* Titre  */}
          <Link
            href={{
              pathname: "/articles/article",
              query: { id: article.id }
            }}
          >
            <a> {article.title} </a>
          </Link>
        </StyledTitle>
        {/* ARTICLE INFORMATIONS */}
        <p> {article.description}</p>
        <p> {article.users.length} / {article.nbPersons} participants</p>
        <p> Démarre le {moment(article.begin_date).format("Do MMMM YYYY")} </p>
        <p>Jusqu'au {moment(article.end_date).format("Do MMMM YYYY")}</p>
        <p> Adresse : {article.adresse}</p>
        <Link
          href={`https://www.google.com/maps/place/${article.adresse.replace(
            " ",
            "+"
          )}/`}
        >
          <a target="_blank"> Localiser </a>
        </Link>
        {/* UPDATED DATE */}
        <p>
          {article.updatedAt !== article.createdAt ? (
            <span>
              {" "}
              Mise à jour le {moment(article.updatedAt).format(
                "Do MMMM YYYY"
              )}{" "}
              par
              <Link
                href={{
                  pathname: "/userPage",
                  query: article.user.id
                }}
              >
                <a>{article.user.name + article.user.surname} </a>
              </Link>
            </span>
          ) : (
            /* CREATION DATE */
            <span>
              {" "}
              Créé le : {moment(article.createdAt).format(
                "Do MMMM YYYY"
              )} par{" "}
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
        {/*  Boutons d'action */}
        <div className="actionButtons">
          <Link
            href={{
              pathname: "/articles/updateArticlePage",
              query: { id: article.id }
            }}
          >
            <a> Modifier </a>
          </Link>
          <DeleteArticleButton id={article.id}> Supprimer </DeleteArticleButton>
        </div>
      </StyledArticle>
    );
  }
}

Article.propTypes = propTypes;

export default Article;
