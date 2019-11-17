import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import StyledForm from "../styles/StyledForm";
import StyledRadioRubriques from "../styles/StyledRadioRubriques";
import Error from "../Error";
import moment from "moment";
import Adresses from "./Adresses";
import { CLOUDINARY_URL_UPLOAD } from "../../config";

const RUBRIQUES_QUERY = gql`
  query RUBRIQUES_QUERY {
    rubriques {
      id
      title
      image
    }
  }
`;

const CATEGORIES_QUERY = gql`
  query CATEGORIES_QUERY {
    categories {
      id
      title
      rubrique {
        id
      }
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
    $rubrique: String!
    $category: String!
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
      rubrique: $rubrique
      category: $category
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
      .format("YYYY-MM-DD"),
    rubrique: "",
    category: ""
  };

  // Fill Adresse
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
    if (type !== "number" || (type === "number" && value !== "")) {
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
    } else {
      this.setState({ [name]: "" });
    }
  };

  // Handle Rubrique
  handleRubriqueChange = e => {
    this.setState({
      rubrique: e.target.id
    });
  };

  // HandleCategory
  handleCategoryChange = e => {
    e.persist();
    const category = e.target.value;
    this.setState({
      category
    });
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
                            onChange={this.handleRubriqueChange}
                            checked={this.state.rubrique === rubrique.id}
                            id={`${rubrique.id}`}
                            name="radioBtnRubrique"
                            value={rubrique.title}
                          />
                          <label
                            htmlFor={`${rubrique.id}`}
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
              {/* CATEGORIES */}
              <Query query={CATEGORIES_QUERY}>
                {({ data, loading }) => {
                  if (loading) return <p>Chargement... </p>;
                  const categoriesList = data.categories.filter(
                    c => c.rubrique.id === this.state.rubrique
                  );
                  if (this.state.rubrique === "") 
                    return (
                      <label> 
                        Categorie 
                        <input disabled="disabled" placeholder="Vous devez sélectionner une rubrique" />
                      </label> 
                    )
                  if (this.state.rubrique !== "" && categoriesList.length === 0)
                    return (
                      <label> 
                        Categorie 
                        <input disabled="disabled" placeholder="Cette rubrique n'a pas de catégorie" />
                      </label> 
                    );
                  return (
                    <label htmlFor="category">
                      Categorie
                      <select
                        onChange={this.handleCategoryChange}
                        value={this.state.category}
                        id="category"
                        name="category"
                      >
                        <option key="categoryDefaultKey" value="">
                          Selectionnez une catégorie
                        </option>
                        {categoriesList.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.title}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                }}
              </Query>

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
              {/* Adresse */}
              <div className="autocomplete">
                <label htmlFor="adresse">
                  Adresse de l'évènement
                  <Adresses id="adresse" parentCallback={this.callbackAdressesFunction} />
                </label> 
              </div>
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
              {/* Image */}
              <input
                type="file"
                id="image"
                name="image"
                required
                placeholder="Selectionnez votre image"
                onChange={this.uploadImage}
                disabled={this.state.image && this.state.loadigImg}
              />
              <label htmlFor="image">
                {" "}
                Ajouter l'image représentant l'évènement{" "}
              </label>
              {!this.state.image && this.state.loadigImg && (
                <span className="imgLoading">
                  Chargement de l'image en cours
                </span>
              )}
              {this.state.image && (
                <img
                  className="imgNormal"
                  src={this.state.image}
                  alt="UploadedImage"
                />
              )}
              {/* Prix */}
              <label
                htmlFor="price"
                className={this.state.price === 0 ? "line" : ""}
              >
                <span>Prix par personne</span>
                <span className="free">
                  {this.state.price === 0 ? "Gratuit" : ""}
                </span>
                <input
                  type="number"
                  value={this.state.price}
                  onChange={this.handleChange}
                  id="price"
                  name="price"
                  placeholder="Prix"
                  required
                />
              </label>
              {/* Submit */}
              <button
                type="submit"
                disabled={
                  this.state.adresse === "" ||
                  this.state.title === "" ||
                  this.state.description === "" ||
                  this.state.image === "" ||
                  this.state.rubrique === "" ||
                  this.state.greatImage === "" ||
                  this.state.price.toString() === "NaN" ||
                  this.state.nbPersons.toString() === "NaN" ||
                  this.state.begin_date === "" ||
                  this.state.end_date === "" ||
                  this.state.category === ""
                }
              >
                Créer
              </button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default CreateArticle;
