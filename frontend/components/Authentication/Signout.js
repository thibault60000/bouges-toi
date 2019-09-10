import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { Exit } from "styled-icons/icomoon/Exit";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "./User";

const ExitIcon = styled(Exit)`
  color: #4f4949;
  width: 2.8rem;
  margin-right: 0.5rem;
`;

const StyledSignoutButton = styled.button`
  font-family: "robotoregular";
  text-transform: "uppercase";
  color: "#4f4949";
  :hover,
  :hover svg {
    color: #ff460f;
  }
`;

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;
const Signout = props => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => (
      <StyledSignoutButton
        onClick={() => {
          signout();
          Router.push("/");
        }}
      >
        <ExitIcon /> Déconnexion
      </StyledSignoutButton>
    )}
  </Mutation>
);

export default Signout;
