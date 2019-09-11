import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Error from "../Error";
import StyledForm from "../styles/StyledForm";
import { CURRENT_USER_QUERY } from "./User";
import FacebookSignUpButton from "./FacebookSignUpButton";
import GoogleSignUpButton from "./GoogleSignUpButton";
import { CLOUDINARY_URL_UPLOAD } from "../../config";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $surname: String!
    $password: String!
    $picture: String!
  ) {
    signup(
      email: $email
      name: $name
      surname: $surname
      password: $password
      picture: $picture
    ) {
      id
      email
      name
      surname
      picture
    }
  }
`;
class Signup extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    password: "",
    picture: "",
    loadigImg: false
  };

  // Upload
  uploadImage = async e => {
    this.setState({
      loadigImg: true
    });
    const images = e.target.files;
    const data = new FormData();
    data.append("file", images[0]);
    data.append("upload_preset", "tutorial");
    const response = await fetch(CLOUDINARY_URL_UPLOAD, {
      method: "POST",
      body: data
    });
    const image = await response.json();
    if (image.secure_url) {
      this.setState({
        picture: image.secure_url,
        loadigImg: false
      });
    } else {
      this.setState({
        picture: "",
        loadigImg: false
      });
    }
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
              await signup();
              this.setState({
                name: "",
                email: "",
                surname: "",
                password: "",
                picture: "",
                loadingImg: false
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <div className="top-container">
                {/* Authentification */}
                <div>
                  <h2> Inscription </h2>
                  <div className="socialNetworks">
                    <span className="facebookAuth">
                      <FacebookSignUpButton />
                    </span>
                    <span className="googleAuth">
                      <GoogleSignUpButton />{" "}
                    </span>
                  </div>
                </div>
                {/* Image de fond */}
                <div>
                  <img src="../../static/img/login.svg" />
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
              {/* Prénom */}
              <label htmlFor="name">
                Prénom
                <input
                  type="text"
                  name="name"
                  placeholder="Prénom"
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
                  placeholder="Nom"
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
                  placeholder="Mot de passe"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              {/* Image */}
              <input
                type="file"
                id="picture"
                name="picture"
                required
                placeholder="Selectionnez votre image"
                onChange={this.uploadImage}
                disabled={this.state.picture && this.state.loadigImg}
              />
              <label htmlFor="picture"> Ajouter sa photo de profil</label>
              {!this.state.picture && this.state.loadigImg && (
                <span className="imgLoading">
                  Chargement de l'image en cours
                </span>
              )}
              {this.state.picture && (
                <img
                  className="imgProfile"
                  src={this.state.picture}
                  alt="UploadedImage"
                />
              )}

              <button
                type="submit"
                disabled={
                  this.state.name === "" ||
                  this.state.surname === "" ||
                  this.state.password === "" ||
                  this.state.email === "" ||
                  this.state.picture === ""
                }
              >
                S'inscrire !
              </button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default Signup;
