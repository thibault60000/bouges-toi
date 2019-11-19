import React, { Component } from "react";
import styled from "styled-components";
import classnames from "classnames";
import PropTypes from "prop-types";
import Link from "next/link";
import DeletePremiumOfferButton from "./DeletePremiumOfferButton";
import AddToCart from "../Cart/AddToCart";
import { EditAlt } from "styled-icons/boxicons-solid/EditAlt";
import formatMoney from "../../lib/formatMoney";

const StyledEditIcon = styled(EditAlt)`
  height: 1.7rem;
  margin-top: -0.1rem;
`;

const propTypes = {
  premiumOffer: PropTypes.object.isRequired
};

const StyledPremiumOffer = styled.li`
  background: white;
  display: flex;
  flex-direction: row;
  position: relative;
  border: 1px solid #ebebeb;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding: 1.3rem;
  position: relative;
  &.is-admin {
    margin-bottom: 3rem;
  }
  .description {
    width: 30%;
    overflow: hidden;
    color: #454b73;
    margin: 0;
    text-align: center;
    white-space: initial;
    margin-top: 3.2rem;
    padding: 0 3.5rem;
  }
  .price {
    padding-right: 0.9rem;
    border-right: 4px solid #454b73;
    margin: 0;
    line-height: 10rem;
    color: #454b73;
    font-weight: bold;
    width: 10%;
    font-size: 2.6rem;
  }
  .edit-premium-offer {
    position: absolute;
    right: 16rem;
    bottom: -4.2rem;
    border: none;
    padding: 0.3rem 1.9rem;
    background-color: #607d8b;
    color: white;
    border-radius: 3px;
    font-size: 1.8rem;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`;
const StyledPremiumOfferTitle = styled.h3`
  width: 40%;
  overflow: hidden;
  color: #ff460f;
  position: relative;
  line-height: 10rem;
  margin: 0;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 3.5rem;
  :hover {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 10;
    text-overflow: initial;
    width: 100%;
    height: 100%;
    padding: 0;
    line-height: 12rem;
    font-size: 2.9rem;
  }
`;

export class PremiumOffer extends Component {
  render() {
    const { premiumOffer, me } = this.props;
    return (
      <StyledPremiumOffer
        className={classnames({
          "is-admin": me.permissions.includes("ADMIN")
        })}
      >
        {/* Prix */}
        <p className="price">
          {premiumOffer.price ? formatMoney(premiumOffer.price) : ""}
        </p>
        <StyledPremiumOfferTitle>
          {/* Titre  */}
          <span>{premiumOffer.title}</span>
        </StyledPremiumOfferTitle>
        {/* Description */}
        <p className="description"> {premiumOffer.description}</p>
        {/*  Boutons d'action */}
        <div className="actionButtons">
          <Link
            href={{
              pathname: "/premiumOffers/updatePremiumOfferPage",
              query: { id: premiumOffer.id }
            }}
          >
            <a className="edit-premium-offer"> <StyledEditIcon /> <span> Modifier </span> </a>
          </Link>
          <AddToCart id={premiumOffer.id} />
          {me.permissions.includes("ADMIN") && (
            <DeletePremiumOfferButton id={premiumOffer.id}>
               Supprimer
            </DeletePremiumOfferButton>
          )}
        </div>
      </StyledPremiumOffer>
    );
  }
}

PremiumOffer.propTypes = propTypes;

export default PremiumOffer;
