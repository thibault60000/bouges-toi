import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../Error";
import StyledForm from "../styles/StyledForm";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";

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
                pathname: "/",
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2> Connexion </h2>

              <Error error={error} />
              {/* Email */}
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
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
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit"> Se connecter ! </button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default Signin;
