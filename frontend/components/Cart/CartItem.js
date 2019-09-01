import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import formatMoney from "../../lib/formatMoney";
import RemoveFromCard from "./RemoveFromCart";

const StyledCarItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid lightgrey;
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr 1auto;
  h3,
  p {
    margin: 0%;
  }
`;

const CartItem = ({ cartItem }) => {
  // 1. Test si l'élément exist
  if (!cartItem.premiumOffer) return <p> L'offre à été suppriéme <RemoveFromCard id={cartItem.id} /></p>;
  return (
    <StyledCarItem>
      <div className="details">
        <h3> {cartItem.premiumOffer.title} </h3>
        <p>
          {formatMoney(cartItem.premiumOffer.price * cartItem.quantity)} (
          <em>
            {formatMoney(cartItem.premiumOffer.price)} &times;
            {cartItem.quantity}
          </em>
          )
        </p>
      </div>
      <RemoveFromCard id={cartItem.id} />
    </StyledCarItem>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired
};
export default CartItem;
