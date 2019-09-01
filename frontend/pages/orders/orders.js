import React from "react";
import PleaseSignIn from "../../components/Authentication/PleaseSignIn";
import Orders from "../../components/Orders/Orders";

const OrdersPage = props => (
  <div>
    <PleaseSignIn>
      <Orders />
    </PleaseSignIn>
  </div>
);

export default OrdersPage;
