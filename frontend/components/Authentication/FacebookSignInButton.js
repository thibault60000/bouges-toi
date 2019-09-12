import React from "react";
import FacebookLogin from "react-facebook-login";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";
import NProgress from "nprogress";

const FACEBOOK_SIGNIN_QUERY = gql`
  mutation FACEBOOK_SIGNIN_QUERY(
    $accessToken: String!
    $email: String!
    $name: String!
    $picture: String
    $userID: String!
  ) {
    facebookSignin(
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

class FacebookSignInButton extends React.Component {
  render() {
    /* Erreur */
    const facebookError = err => {
      console.log(err);
    }
    /* Succès */
    const responseFacebook = async (response, client) => {
      NProgress.start();
      this.setState({ loading: true });
      const { accessToken, email, name, userID } = response;
      const picture =
        response.picture && response.picture.data
          ? response.picture.data.url
          : "";
      const res = await client.mutate({
        mutation: FACEBOOK_SIGNIN_QUERY,
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
              onFailure={err => facebookError(err)}
              textButton="Se connecter avec Facebook"
            />
          )}
        </ApolloConsumer>
      </div>
    );
  }
}

export default FacebookSignInButton;
