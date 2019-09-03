import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../Error";
import StyledForm from "../styles/StyledForm";
import { CURRENT_USER_QUERY } from "./User";
import FacebookSignUpButton from "./FacebookSignUpButton";
import GoogleSignUpButton from "./GoogleSignUpButton";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $surname: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, surname: $surname, password: $password) {
      id
      email
      name
      surname
    }
  }
`;
class Signup extends Component {
  state = {
    name: "",
    surname: "",
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
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <StyledForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const response = await signup();
              this.setState({ name: "", email: "", surname: "", password: "" });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2> Inscription </h2>

              <Error error={error} />

              <FacebookSignUpButton />
              <GoogleSignUpButton />
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
              {/* Prénom */}
              <label htmlFor="name">
                Prénom
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.saveToState}
                />
              </label>
              {/* Nom */}
              <label htmlFor="surname">
                Nom
                <input
                  type="text"
                  name="surname"
                  placeholder="surname"
                  value={this.state.surname}
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
              <button type="submit"> S'inscrire ! </button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default Signup;
