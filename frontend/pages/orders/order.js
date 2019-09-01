import React from "react";
import PleaseSignIn from "../../components/Authentication/PleaseSignIn";
import Order from "../../components/Orders/Order";

const OrderPage = props => (
  <div>
    <PleaseSignIn>
      <Order id={props.query.id} />
    </PleaseSignIn>
  </div>
);

export default OrderPage;
