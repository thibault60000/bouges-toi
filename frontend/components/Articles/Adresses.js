import React, { Component } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { API_ADRESSES } from "../../config";

// DOC : https://github.com/moroshko/react-autosuggest#installation
// DOC : https://adresse.data.gouv.fr/api

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
  .react-autosuggest__suggestion {
    color: black;
    font-family: "robotoregular";
    font-size: 1.8rem;
    line-height: 2.7rem;

  }
  .react-autosuggest__suggestion:hover {
    font-weight: bold;
    cursor: pointer;
  }
`;

export default class Adresses extends Component {
  state = {
    adresses: [],
    suggestions: [],
    value: ""
  };
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    if (this.state.adresses.some(p => p.properties.label === newValue))
      this.props.parentCallback(newValue);
    else this.props.parentCallback("");
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.getSuggestions(value);
  };

  getSuggestionValue = suggestion => suggestion.properties.label;

  renderSuggestion = suggestion => <div>{suggestion.properties.label}</div>;

  getAdresses = inputValue => {
    let adresse = "";
    inputValue.split(" ").forEach((v, index) => {
      if (index === 0) adresse = v;
      else adresse += `+${v}`;
    });
    return axios
      .get(`${API_ADRESSES}q=${adresse}`)
      .then(response => response.data.features);
  };

  getSuggestions = debounce(async value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength < 5) {
      return [];
    } else {
      this.getAdresses(inputValue).then(adresses => {
        adresses.length
          ? this.setState({ suggestions: adresses, adresses })
          : this.setState({ suggestions: [] });
      });
    }

    return [];
  }, 350);

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Entrez l'adresse ou la ville ",
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
