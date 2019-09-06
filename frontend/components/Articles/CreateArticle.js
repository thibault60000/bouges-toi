import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";

import StyledForm from "../styles/StyledForm";
import Error from "../Error";
import moment from "moment";
import Adresses from "./Adresses";
import { CLOUDINARY_URL_UPLOAD } from "../../config";

const StyledRadioRubriques = styled.div`
    display: grid;
    grid-template-columns: 100px auto;
    grid-gap: 3rem;
    height: 18rem;

  input[type="radio"] {
    position: asbolute;
    left: -9999px;
    opacity: 0;
  }
  label {
    height: 10rem;
    width: 10rem;
    background-size: cover;
    position: relative;
    cursor: pointer;
  }
  label span {
    display: block;
    position: absolute;
    top: 11.8rem;
    line-height: 1.3rem;
    overflow: hidden;
    font-size: 1.3rem;
    text-align: center;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-overflow: ellipsis;
  }
  input[type="radio"]:checked + label {
    border: 3px solid #673ab7;
    color: #673ab7;
    border-radius: 5px;
  }
`;

const RUBRIQUES_QUERY = gql`
  query RUBRIQUES_QUERY {
    rubriques {
      id
      title
      image
    }
  }
`;

const CREATE_ARTICLE_MUTATION = gql`
  mutation CREATE_ARTICLE_MUTATION(
    $title: String!
    $description: String!
    $image: String!
    $nbPersons: Int!
    $greatImage: String!
    $adresse: String!
    $begin_date: DateTime!
    $end_date: DateTime!
    $price: Int!
  ) {
    createArticle(
      title: $title
      description: $description
      image: $image
      nbPersons: $nbPersons
      greatImage: $greatImage
      adresse: $adresse
      begin_date: $begin_date
      end_date: $end_date
      price: $price
    ) {
      id
    }
  }
`;
export class CreateArticle extends Component {
  state = {
    adresse: "",
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

  callbackAdressesFunction = adresse => {
    this.setState({ adresse });
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
      <Mutation
        mutation={CREATE_ARTICLE_MUTATION}
        variables={{
          ...this.state
        }}
      >
        {(createArticle, { data, loading, error }) => (
          <StyledForm
            disabled={loading}
            aria-busy={loading}
            onSubmit={async e => {
              e.preventDefault();
              const response = await createArticle();
              Router.push({
                pathname: "/articles/article",
                query: { id: response.data.createArticle.id }
              });
            }}
          >
            <Error error={error} />

            <div>
              <Adresses parentCallback={this.callbackAdressesFunction} />
              <span> {this.state.adresse !== "" && "V"}</span>
            </div>
            <fieldset>
            <label> Rubrique </label> 
              {/* RUBRIQUES */}
              <Query query={RUBRIQUES_QUERY}>
                {({ data, loading }) => {
                  if (loading) return <p>Chargement...</p>;
                  return (
                    <StyledRadioRubriques>
                     
                      {data.rubriques.map(rubrique => (
                        <p key={rubrique.id}>
                          <input
                            type="radio"
                            id={`radioBtn${rubrique.id}`}
                            name="radioBtnRubrique"
                            value={rubrique.title}
                          />
                          <label
                            htmlFor={`radioBtn${rubrique.id}`}
                            style={{
                              backgroundImage: `url('${rubrique.image}')`
                            }}
                          >
                            <span>{rubrique.title}</span>
                          </label>
                        </p>
                      ))}
                    </StyledRadioRubriques>
                  );
                }}
              </Query>
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
