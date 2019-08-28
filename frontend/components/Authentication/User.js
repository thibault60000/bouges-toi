import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY{
    me {
      id
      email
      name
      permissions
    }
  }
`;

class User extends Component {
    
  render() {
    console.log( { ... this.props })
    return (
      <Query {...this.props} query={CURRENT_USER_QUERY} >
        {payload => this.props.children(payload)}
      </Query>
    );
  }
}

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };
