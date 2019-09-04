import React, { Component } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";
import { API_COMMUNES } from "../../config";
// DOC : https://github.com/moroshko/react-autosuggest#installation

const StyledAutoSuggest = styled.div`
  .react-autosuggest__input {
    border-radius: 0;
  }
  .react-autosuggest__suggestions-list {
    background-color: white;
    margin-top: 0.5rem;
    list-style: none;
    padding: 0.8rem;
  }
  .react-autosuggest__suggestion:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default class Communes extends Component {
  state = {
    communes: [],
    suggestions: [],
    value: ""
  };
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.getSuggestions(value);
  };

  getSuggestionValue = suggestion => suggestion.nom;

  renderSuggestion = suggestion => <div>{suggestion.nom}</div>;

  getCommunes = inputValue => {
    return axios
      .get(
        `https://geo.api.gouv.fr/communes?nom=${inputValue}&fields=nom,code&format=json&geometry=centre`
      )
      .then(response => response.data);
  };

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength < 4) {
      return [];
    } else if (inputLength === 4) {
      this.getCommunes(inputValue).then(communes => {
        communes.length
          ? this.setState({ suggestions: communes, communes })
          : this.setState({ suggestions: [] });
      });
    } else {
      const communes = this.state.communes.length
        ? this.state.communes.filter(
            c => c.nom.toLowerCase().slice(0, inputLength) === inputValue
          )
        : [];
      this.setState({ suggestions: communes });
    }

    return [];
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Entrez le nom de la commune",
      value,
      onChange: this.onChange
    };
    return (
      <StyledAutoSuggest>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </StyledAutoSuggest>
    );
  }
}
