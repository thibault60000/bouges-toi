import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../Error";
import StyledForm from "../styles/StyledForm";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;
class RequestReset extends Component {
  state = {
    email: ""
  };

  // Set State des Inputs
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Render
  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => (
          <StyledForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const response = await reset();
              this.setState({ email: "" });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2> Récupérer son mot de passe </h2>

              <Error error={error} />
              {!error && !loading && called && <p> Mot de passe envoyé ! </p>}
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
              <button type="submit"> Je veux mon mot de passe ! </button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
