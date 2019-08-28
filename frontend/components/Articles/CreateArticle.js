import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import StyledForm from "../styles/StyledForm";
import Error from "../Error";
import Router from "next/router";

const CREATE_ARTICLE_MUTATION = gql`
  mutation CREATE_ARTICLE_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $greatImage: String
    $price: Int!
  ) {
    createArticle(
      title: $title
      description: $description
      image: $image
      greatImage: $greatImage
      price: $price
    ) {
      id
    }
  }
`;
export class CreateArticle extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    greatImage: "",
    price: 0
  };

  // Upload
  uploadImage = async e => {
    const images = e.target.files;
    const data = new FormData();
    data.append('file', images[0]);
    data.append('upload_preset', 'tutorial');
    const response = await fetch('https://api.cloudinary.com/v1_1/dgn9blq0o/image/upload', {
      method: 'POST',
      body: data
    });
    const image = await response.json();
    this.setState({
      image: image.secure_url,
      greatImage: image.eager[0].secure_url
    })
  };

  // Handle Change 
  handleChange = e => {
    const { name, type, value } = e.target;
    const v = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: v });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ARTICLE_MUTATION} variables={this.state} >
        {(createArticle, { data, loading, error }) => (
          <StyledForm
            disabled={loading}
            aria-busy={loading}
            onSubmit={async e => {
              e.preventDefault();
              const response = await createArticle();
              Router.push({
                pathname: '/article',
                query: { id: response.data.createArticle.id}
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
                {this.state.image && <img width="200" src={this.state.image} alt="UploadedImage" /> }

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
              {/* Description */}
              <label htmlFor="description">
                Description
                <textarea
                  value={this.state.description}
                  onChange={this.handleChange}
                  id="description"
                  name="description"
                  placeholder="Description"
                  required
                />
              </label>
              {/* Prix */}
              <label htmlFor="price">
                <input
                  type="number"
                  value={this.state.price}
                  onChange={this.handleChange}
                  id="price"
                  name="price"
                  placeholder="Prix"
                  required
                />
                <span className="free">
                  {this.state.price === 0 ? "Gratuit" : ""}
                </span>
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

export default CreateArticle;
