import React from "react";
import CreatePremiumOffer from "../../components/PremiumOffers/CreatePremiumOffer";
import PleaseSignIn from "../../components/Authentication/PleaseSignIn";

const CreatePremiumOfferPage = props => (
    <div>
        <PleaseSignIn>
            <CreatePremiumOffer />
        </PleaseSignIn>
    </div>
)

export default CreatePremiumOfferPage;
 