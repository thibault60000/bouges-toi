import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import StyledForm from "../styles/StyledForm";
import Error from "../Error";
import Router from "next/router";

const CREATE_RUBRIQUE_MUTATION = gql`
  mutation CREATE_RUBRIQUE_MUTATION($title: String!, $image: String) {
    createRubrique(title: $title, image: $image) {
      id
    }
  }
`;
export class CreateRubrique extends Component {
  state = {
    title: "",
    image: "",
    imageLoading: false
  };

  // Upload
  uploadImage = async e => {
    this.setState({ imageLoading: true});
    const images = e.target.files;
    const data = new FormData();
    data.append("file", images[0]);
    data.append("upload_preset", "tutorial");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dgn9blq0o/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const image = await response.json();
    this.setState({
      image: image.secure_url,
      imageLoading: false
    });
  };

  // Handle Change
  handleChange = e => {
    const { name, type, value } = e.target;
    const v = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: v });
  };

  render() {
    return (
      <Mutation mutation={CREATE_RUBRIQUE_MUTATION} variables={this.state}>
        {(createRubrique, { data, loading, error }) => (
          <StyledForm
            disabled={loading}
            aria-busy={loading}
            onSubmit={async e => {
              e.preventDefault();
              const response = await createRubrique();
              Router.push({
                pathname: "/rubriques/rubrique",
                query: { id: response.data.createRubrique.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset>
              {/* Image */}
              <label htmlFor="image">
                Image
                <input
                  type="file"
                  id="image"
                  name="image"
                  required
                  placeholder="Selectionnez votre image"
                  onChange={this.uploadImage}
                />
                { !this.state.image && this.state.imageLoading && (
                    <p> Chargement de l'image </p>
                ) }
                {this.state.image && (
                  <img width="200" src={this.state.image} alt="UploadedImage" />
                )}
              </label>
              {/* Titre */}
              <label htmlFor="title">
                Titre
                <input
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                  id="title"
                  name="title"
                  placeholder="Titre"
                  required
                />
              </label>
              {/* Submit */}
              <button type="submit"> Créer </button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default CreateRubrique;
