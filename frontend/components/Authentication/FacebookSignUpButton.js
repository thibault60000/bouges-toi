import React from "react";
import FacebookLogin from "react-facebook-login";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";

const FACEBOOK_SIGNUP_QUERY = gql`
  mutation FACEBOOK_SIGNUP_QUERY(
    $accessToken: String!
    $email: String!
    $name: String!
    $picture: String
    $userID: String!
  ) {
    facebookLogin(
      accessToken: $accessToken
      email: $email
      name: $name
      picture: $picture
      userID: $userID
    ) {
      id
      email
      name
      surname
    }
  }
`;

class FacebookSignUpButton extends React.Component {
  render() {
    const responseFacebook = async (response, client) => {
      const { accessToken, email, name, userID } = response;
      const picture = response.picture.data ? response.picture.data.url : "";
      const res = await client.mutate({
        mutation: FACEBOOK_SIGNUP_QUERY,
        variables: { accessToken, email, name, picture, userID },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
      });
      Router.push({
        pathname: "/"
      });
    };

    return (
      <div>
        <ApolloConsumer>
          {client => (
            <FacebookLogin
              appId="2497386717161081"
              autoLoad={false}
              fields="name,email,picture"
              callback={response => responseFacebook(response, client)}
            />
          )}
        </ApolloConsumer>
      </div>
    );
  }
}

export default FacebookSignUpButton;
