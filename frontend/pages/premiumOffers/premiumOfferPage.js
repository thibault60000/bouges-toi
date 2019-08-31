import React from "react";
import ReadPremiumOffer from "../../components/PremiumOffers/ReadPremiumOffer";

const PremiumOffer = props => {
  return (
    <div>
      <ReadPremiumOffer id={props.query.id} />
    </div>
  );
};

export default PremiumOffer;
