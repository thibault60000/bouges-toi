import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import StyledForm from "../styles/StyledForm";
import Error from "../Error";
import Router from "next/router";
import moment from "moment";

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
    price: 0,
    nbPersons: 2,
    loadigImg: false,
    begin_date: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    end_date: moment(new Date(Date.now()))
      .add(1, "days")
      .format("YYYY-MM-DD")
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
      greatImage: image.eager[0].secure_url,
      loadigImg: false
    });
  };

  // Handle Change
  handleChange = e => {
    const { name, type, value } = e.target;
    const v = type === "number" ? parseFloat(value) : value;
    // If Date
    if (type === "date") {
      const getCurrentDate = this.state[name];
      this.setState({ [name]: value }, () => {
        // debut<jour ou fin<debut
        if (
          this.state.begin_date > this.state.end_date ||
          this.state.begin_date <
            moment(new Date(Date.now())).format("YYYY-MM-DD")
        ) {
          alert("La date de fin doit être supérieure à la date de début");
          this.setState({ [name]: getCurrentDate });
        }
      });
    } else {
      this.setState({ [name]: v });
    }
  };

  render() {
    return (
      <Mutation mutation={CREATE_ARTICLE_MUTATION} variables={this.state}>
        {(createArticle, { data, loading, error }) => (
          <StyledForm
            disabled={loading}
            aria-busy={loading}
            onSubmit={async e => {
              e.preventDefault();
              const response = await createArticle();
              Router.push({
                pathname: "articles/article",
                query: { id: response.data.createArticle.id }
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
                {!this.state.image && this.state.loadigImg && (
                  <span> Chargement de l'image en cours </span>
                )}
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
              {/* Date de début */}
              <label htmlFor="begin_date">
                Date de début
                <input
                  type="date"
                  value={this.state.begin_date}
                  onChange={this.handleChange}
                  id="begin_date"
                  name="begin_date"
                  min="2018-01-01"
                  max="2050-12-31"
                  required
                />
              </label>
              {/* Date de Fin */}
              <label htmlFor="end_date">
                Date de fin
                <input
                  type="date"
                  value={this.state.end_date}
                  onChange={this.handleChange}
                  id="end_date"
                  name="end_date"
                  min="2018-01-01"
                  max="2050-12-31"
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
              {/* Nombre de participants */}
              <label htmlFor="nbPersons">
                Nombre de participants maximum
                <input
                  type="number"
                  value={this.state.begin_date}
                  onChange={this.handleChange}
                  id="nbPersons"
                  name="nbPersons"
                  value={this.state.nbPersons}
                  min="2"
                  max="50"
                  required
                />
              </label>
              {/* Prix */}
              <label htmlFor="price">
                Prix
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
