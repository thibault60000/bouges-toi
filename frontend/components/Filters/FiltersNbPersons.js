import React from "react";
import { ApolloConsumer } from "react-apollo";
import debounce from "lodash.debounce";
import classnames from "classnames";
import Router from "next/router";

import StyledNbPersonsTag from "../styles/StyledNbPersonsTag";

class FiltersNbPersons extends React.Component {
  // State
  state = {
    articles: [],
    loading: false,
    nbPersons: "",
    errorNbPersons: false
  };

  // OnChange Number of Persons
  onChangeNbPersons = debounce(async (e, client) => {
    const value = parseInt(e.target.value, 10);
    if (this.state.nbPersons !== value) {
      Router.push({
        pathname: "/"
      });
    }
    let min, max;
    // Calcul du nombre de personnes min et max
    if (value === 5) {
      min = 0;
      max = 5;
    } else if (value === 10) {
      min = 6;
      max = 10;
    } else {
      min = 11;
      max = 100;
    }
    this.props.startSearch(min, max, client);
  }, 350);

  render() {
    return (
      <div>
        <ApolloConsumer>
          {client => (
            <StyledNbPersonsTag>
              {/* Choix 1 - Moins de 5 personnes */}
              <input
                type="radio"
                id="nbPersons0"
                name="nbPersons"
                checked={this.state.nbPersons === "5"}
                value="5"
                className={classnames({
                  error:
                    this.state.errorNbPersons && this.state.nbPersons === "5"
                })}
                onChange={e => {
                  e.persist();
                  this.onChangeNbPersons(e, client);
                }}
              />
              <label htmlFor="nbPersons0"> {"0 à 5"} </label>
              {/* Choix 2 - Moins de 10 personnes  */}
              <input
                type="radio"
                id="nbPersons5"
                name="nbPersons"
                checked={this.state.nbPersons === "10"}
                value="10"
                className={classnames({
                  error:
                    this.state.errorNbPersons && this.state.nbPersons === "10"
                })}
                onChange={e => {
                  e.persist();
                  this.onChangeNbPersons(e, client);
                }}
              />
              <label htmlFor="nbPersons5"> {"6 à 10"} </label>
              {/* Choix 3 - Moins de 100 personnes */}
              <input
                type="radio"
                id="nbPersons10"
                checked={this.state.nbPersons === "100"}
                name="nbPersons"
                value="100"
                className={classnames({
                  error:
                    this.state.errorNbPersons && this.state.nbPersons === "100"
                })}
                onChange={e => {
                  e.persist();
                  this.onChangeNbPersons(e, client);
                }}
              />
              <label htmlFor="nbPersons10"> {"plus de 10"} </label>
            </StyledNbPersonsTag>
          )}
        </ApolloConsumer>
      </div>
    );
  }
}

export default FiltersNbPersons;
