import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import StyledArticle from "../styles/StyledArticle";
import StyledTitle from "../styles/StyledTitle";
import DeletePremiumOfferButton from "./DeletePremiumOfferButton";
import AddToCart from "../Cart/AddToCart";

const propTypes = {
  premiumOffer: PropTypes.object.isRequired
};

export class PremiumOffer extends Component {
  render() {
    const { premiumOffer } = this.props;
    return (
      <StyledArticle>
        <p className={"price" + (premiumOffer.price === 0 ? "" : " notFree")}>
          {premiumOffer.price === 0 ? "Gratuit" : premiumOffer.price + " € "}
        </p>
        {premiumOffer.image ? (
          <img src={premiumOffer.image} alt={premiumOffer.title} />
        ) : null}
        <StyledTitle>
          {/* Titre  */}
          <Link
            href={{
              pathname: "/premiumOffers/premiumOffer",
              query: { id: premiumOffer.id }
            }}
          >
            <a> {premiumOffer.title} </a>
          </Link>
        </StyledTitle>
        {/* Description */}
        <p> {premiumOffer.description}</p>
        {/*  Boutons d'action */}
        <div className="actionButtons">
          <Link
            href={{
              pathname: "/premiumOffers/updatePremiumOfferPage",
              query: { id: premiumOffer.id }
            }}
          >
            <a> Modifier </a>
          </Link>
          <AddToCart id={premiumOffer.id} />
          <DeletePremiumOfferButton id={premiumOffer.id}>
            Supprimer
          </DeletePremiumOfferButton>
        </div>
      </StyledArticle>
    );
  }
}

PremiumOffer.propTypes = propTypes;

export default PremiumOffer;
