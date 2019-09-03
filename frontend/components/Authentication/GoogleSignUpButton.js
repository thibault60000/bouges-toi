import React from "react";
import GoogleLogin from "react-google-login";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";
import NProgress from "nprogress";

const GOOGLE_SIGNUP_QUERY = gql`
  mutation GOOGLE_SIGNUP_QUERY(
    $accessToken: String!
    $email: String!
    $name: String!
    $picture: String
    $userID: String!
  ) {
    facebookSignup(
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

class GoogleSignUpbutton extends React.Component {
  state = {
    loading: false
  }
  render() {
    // ERROR
    const failedConnection = response => {
      alert(response);
    }

    // SUCCESS
    const responseGoogle = async(response, client) => {
      NProgress.start();
      this.setState({ loading: true});
      const {accessToken,} = response;
      const picture = response.profileObj && response.profileObj.imageUrl ? response.profileObj.imageUrl : "";
      const email = response.profileObj.email ? response.profileObj.email : "";
      const givenName = response.profileObj.givenName ? response.profileObj.givenName : "";
      const familyName = response.profileObj.familyName ? response.profileObj.familyName : "";
      const name = givenName + ' ' + familyName;
      const userID = response.profileObj.googleId;
      const res = await client
      .mutate({
        mutation: GOOGLE_SIGNUP_QUERY,
        variables: { accessToken, email, name, picture, userID },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
      })
      .catch(err => alert(err.message && err.message.replace("GraphQL error: ", "")));
    this.setState({ loading: false });
    Router.push({
      pathname: "/"
    });
    };

    // COMPONENT
    return (
      <div>
        <ApolloConsumer>
          { client => (
            <GoogleLogin
            clientId="490758671748-e7t4bs8rbisrr6kk2crfdurqsfjtees8.apps.googleusercontent.com"
            buttonText="S'inscrire avec Google"
            onSuccess={response => responseGoogle(response, client)}
            onFailure={error => failedConnection(error)}
            cookiePolicy={'single_host_origin'}
          />
          )}
        </ApolloConsumer>    
      </div>
    );
  }
}

export default GoogleSignUpbutton;
