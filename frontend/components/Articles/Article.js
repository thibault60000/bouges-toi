import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";
import StyledArticle from "../styles/StyledArticle";
import StyledTitle from "../styles/StyledTitle";
import DeleteArticleButton from "./DeleteArticleButton";

const propTypes = {
    article: PropTypes.object.isRequired
};


export class Article extends Component {
    render() {
        const { article } = this.props;
        return (
            <StyledArticle>
                <p className={"price" + (article.price === 0 ? '' : ' notFree')}> { article.price === 0 ? 'Gratuit' : article.price + ' € ' }</p>
                {article.image ? <img src={article.image} alt={article.title} /> : null}
                <StyledTitle> 
                    {/* Titre  */}
                    <Link href={{
                        pathname: "/article",
                        query: { id: article.id }
                    }}>
                        <a> { article.title } </a>
                    </Link> 
                </StyledTitle>
                {/* Description */}
                <p> { article.description }</p>
               {/*  Boutons d'action */}
               <div className="actionButtons">
                   <Link href={{
                       pathname: "updateArticlePage",
                       query: { id: article.id }
                   }}>
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
