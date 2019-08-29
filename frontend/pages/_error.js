import React from "react";

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <p>
        {this.props.statusCode
          ? `Une erreur  ${this.props.statusCode} est survenue sur le serveur`
          : "Une erreur est survenue sur le client"}
      </p>
    );
  }
}

export default Error;
