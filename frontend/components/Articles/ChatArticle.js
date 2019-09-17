import React, { Component } from "react";
import { Query, Mutation, Subscription } from "react-apollo";
import gql from "graphql-tag";
import StyledForm from "../styles/StyledForm";

const GET_MESSAGE_QUERY = gql`
  query GET_MESSAGE_QUERY {
    chats {
      id
      from
      message
    }
  }
`;

const MESSAGE_SENT_SUBSCRIPTION = gql`
  subscription MESSAGE_SENT_SUBSCRIPTION {
    messageSent {
      id
      from
      message
    }
  }
`;

const SEND_MESSSAGE_MUTATION = gql`
  mutation SEND_MESSSAGE_MUTATION($from: String!, $message: String!) {
    sendMessage(from: $from, message: $message) {
      id
      from
      message
    }
  }
`;
class JoinArticle extends Component {
  // State
  state = {
    message: "",
    from: "Thibault"
  };
  // Handle Change
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  // Render
  render() {
    return (
      <Query query={GET_MESSAGE_QUERY}>
        {({ data, loading, error }) => {
          return (
            data && (
              <>
                <ul>
                  {data.chats.map(msg => (
                    <li key={msg.id}> {msg.message} </li>
                  ))}
                </ul>
                <Mutation
                  mutation={SEND_MESSSAGE_MUTATION}
                  variables={this.state}
                >
                  {sendMessage => (
                    <StyledForm>
                      <fieldset>
                        <input
                          type="text"
                          value={this.state.message}
                          onChange={this.handleChange}
                          id="message"
                          name="message"
                          placeholder="message"
                          onKeyDown={async e => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              await sendMessage();
                            }
                          }}
                          required
                        />
                      </fieldset>
                    </StyledForm>
                  )}
                </Mutation>
                <Subscription subscription={MESSAGE_SENT_SUBSCRIPTION}>
                  {payload => {
                    console.log(payload);
                    return <p> test </p>;
                  }}
                </Subscription>
              </>
            )
          );
        }}
      </Query>
    );
  }
}

export default JoinArticle;
