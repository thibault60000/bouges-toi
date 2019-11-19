import React from "react";
import ReadUser from "../../components/Users/ReadUser";
import User from "../../components/Authentication/User";

const UserPage = props => {
  return (
    <User>{({ data: { me } }) => <ReadUser me={me} id={props.query.id} />}</User>
  );
};

export default UserPage;
