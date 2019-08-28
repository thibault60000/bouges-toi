import React, { Component } from "react";
import { Mutation } from "react-apollo";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import Error from "../Error";
import StyledForm from "../styles/StyledForm";
import { CURRENT_USER_QUERY } from "./User";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
      surname
    }
  }
`;
class ResetPassword extends Component {
  // Prop Types
  static propTypes = {
    resetToken: PropTypes.string.isRequired
  };
  state = {
    password: "",
    confirmPassword: ""
  };

  // Set State des Inputs
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Render
  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading, called }) => (
          <StyledForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const response = await reset();
              this.setState({ password: "", confirmPassword: "" });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2> Changez votre mot de passe </h2>
              <Error error={error} />
              {/* Password */}
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
              {/* Confirm Password */}
              <label htmlFor="password">
                Confirmez mot de passe
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmez mot de passe"
                  value={this.state.confirmPassword}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit"> Modifier </button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default ResetPassword;
