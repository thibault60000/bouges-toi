import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import StyledForm from "../styles/StyledForm";

const GET_MESSAGE_QUERY = gql`
  query GET_MESSAGE_QUERY {
    messages {
      id
      title
    }
  }
`;

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription MessageSubscription {
    messageAdded {
      node {
        id
        title
      }
    }
  }
`;

const SEND_MESSSAGE_MUTATION = gql`
  mutation SEND_MESSSAGE_MUTATION($title: String!) {
    createMessage(title: $title) {
      id
    }
  }
`;

class ChatView extends Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }
  render() {
    return (
      <div>
        {this.props.data.messages.map(message => (
          <p> {message.title} </p>
        ))}
      </div>
    );
  }
}

class ChatArticle extends Component {
  state = {
    title: ""
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <>
        <Query query={GET_MESSAGE_QUERY}>
          {({ data, loading, error, subscribeToMore }) => {
            console.log("DATA", data);
            if (loading) return <p>Chargement ...</p>;
            if (error) return <p>Erreur !</p>;
            return (
              <ChatView
                data={data}
                subscribeToMore={() =>
                  subscribeToMore({
                    document: NEW_MESSAGE_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;
                      const { node } = subscriptionData.data.messageAdded;
                      return Object.assign({}, prev, {
                        messages: [...prev.messages, node]
                      });
                    }
                  })
                }
              />
            );
          }}
        </Query>
        <Mutation mutation={SEND_MESSSAGE_MUTATION} variables={this.state}>
          {createMessage => (
            <StyledForm>
              <fieldset>
                <input
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                  id="title"
                  name="title"
                  placeholder="message"
                  onKeyDown={async e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await createMessage();
                    }
                  }}
                  required
                />
              </fieldset>
            </StyledForm>
          )}
        </Mutation>
      </>
    );
  }
}

export default ChatArticle;
