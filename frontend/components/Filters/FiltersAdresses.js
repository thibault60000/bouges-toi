import React from "react";
import { ApolloConsumer } from "react-apollo";
import debounce from "lodash.debounce";
import classnames from "classnames";
import Router from "next/router";

import StyledAdresseTag from "../styles/StyledAdresseTag";

class FiltersAdresses extends React.Component {
  // State
  state = {
    articles: [],
    loading: false,
    adresses: "",
    errorAdresses: false
  };

  // OnChange Select Adresse
  onChange = debounce(async (e, client) => {
    const { value } = e.target;
    if (this.state.adresses !== value) {
      Router.push({
        pathname: "/"
      });
    }
    this.props.startSearch(value, client);
  }, 350);
  render() {
    const { adresses } = this.state;
    return (
        <ApolloConsumer>
          {client => (
            <>
              {/* Fitre sur l'adresse */}
              <StyledAdresseTag>
                <input
                  type="text"
                  placeholder="Adresse"
                  onChange={e => {
                    e.persist();
                    this.onChange(e, client);
                  }}
                />
                <span
                  className={classnames("adresseTag", {
                    reveal: adresses !== ""
                  })}
                >
                  {adresses}
                </span>
              </StyledAdresseTag>
            </>
          )}
        </ApolloConsumer>
    );
  }
}

export default FiltersAdresses;

