import React from "react";
import PremiumOffers from "../../components/PremiumOffers/PremiumOffers";
import User from "../../components/Authentication/User";

const PremiumOffersPage = () => {
  return <User>{({ data: { me } }) => <PremiumOffers me={me} />}</User>;
};

export default PremiumOffersPage;
