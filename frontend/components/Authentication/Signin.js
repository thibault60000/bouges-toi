import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../Error";
import StyledForm from "../styles/StyledForm";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";
import FacebookSignInButton from "./FacebookSignInButton";
import GoogleSignInButton from "./GoogleSignInButton";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
      surname
    }
  }
`;
class Signin extends Component {
  state = {
    email: "",
    password: ""
  };

  // Set State des Inputs
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Render
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => (
          <StyledForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const response = await signin();
              this.setState({ email: "", password: "" });
              Router.push({
                pathname: "/"
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <div className="top-container">
                {/* Authentification */}
                <div>
                  <h2> Connexion </h2>
                  <div className="socialNetworks">
                    <span className="facebookAuth">
                      <FacebookSignInButton />
                    </span>
                    <span className="googleAuth">
                      <GoogleSignInButton />
                    </span>
                  </div>
                </div>
                {/* Image de fond */}
                <div>
                  <img src="../../static/img/authentication.svg" />
                </div>
              </div>

              <Error error={error} />
              {/* Email */}
              <label htmlFor="email">
                Adresse mail
                <input
                  type="email"
                  name="email"
                  placeholder="Adresse mail"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              {/* Mot de passe */}
              <label htmlFor="password">
                Mot de passe
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              <button
                type="submit"
                disabled={this.state.password === "" || this.state.email === ""}
              >
                Se connecter !
              </button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default Signin;
