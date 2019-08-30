import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";
import StyledArticle from "../styles/StyledArticle";
import StyledTitle from "../styles/StyledTitle";
import DeleteRubriqueButton from "./DeleteRubriqueButton";

const propTypes = {
    rubrique: PropTypes.object.isRequired
};


export class Rubrique extends Component {
    render() {
        const { rubrique } = this.props;
        return (
            <StyledArticle>
                {rubrique.image ? <img src={rubrique.image} alt={rubrique.title} /> : null}
                <StyledTitle> 
                    {/* Titre  */}
                    <Link href={{
                        pathname: "rubriques/rubrique",
                        query: { id: rubrique.id }
                    }}>
                        <a> { rubrique.title } </a>
                    </Link> 
                </StyledTitle>
                {/* Description */}
                <p> { rubrique.description }</p>
               {/*  Boutons d'action */}
               <div className="actionButtons">
                   <Link href={{
                       pathname: "rubriques/updateRubriquePage",
                       query: { id: rubrique.id }
                   }}>
                        <a> Modifier </a>
                   </Link>
                   <DeleteRubriqueButton id={rubrique.id}> Supprimer </DeleteRubriqueButton>
               </div>
            </StyledArticle>
        );
    }
}


Rubrique.propTypes = propTypes;


export default Rubrique;
