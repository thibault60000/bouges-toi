import styled from "styled-components";
import React from "react";

import PropTypes from "prop-types";

const StyledError = styled.div`
  padding: 2rem;
  color: red;
  p {
    margin: 0;
    font-weight: bold;
  }
  strong {
    margin-right: 1rem;
  }
`;

const ErrorMessage = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <StyledError key={i}>
        <p>
          <strong>ERREUR :</strong>
          {error.message.replace("GraphQL error: ", "")}
        </p>
      </StyledError>
    ));
  }
  return (
    <StyledError>
      <p>
        <strong>ERREUR :</strong>
        {error.message.replace("GraphQL error: ", "")}
      </p>
    </StyledError>
  );
};

// Test le type des props
ErrorMessage.defaultProps = {
  error: {}
};

ErrorMessage.propTypes = {
  error: PropTypes.object
};

export default ErrorMessage;
