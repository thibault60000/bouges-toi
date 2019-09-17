import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import StyledForm from "../styles/StyledForm";
import Error from "../Error";

const GET_MESSAGE_QUERY = gql`
  query GET_MESSAGE_QUERY {
    chats {
      id
      from
      message
    }
  }
`;

const subscription = gql`
  subscription Message {
    messageSent {
      mutation
      data {
        id
        from
        message
      }
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

class MessageListView extends Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }
  render() {
    const { data } = this.props;
    console.log("DATA 2 ", data);
    return (
      <ul>
        {data.chats.map(msg => (
          <li key={msg.id}> {msg.message} </li>
        ))}
      </ul>
    );
  }
}

class JoinArticle extends Component {
  // State
  state = {
    message: "",
    from: "Me"
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
        {({ data, loading, error, subscribeToMore }) => {
          if (loading) return <p> Chargement ...</p>;
          if (error) return <Error error={error} />;
          const more = () =>
            subscribeToMore({
              document: subscription,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { mutation, data } = subscriptionData.data.messageSent;
                if (mutation !== "CREATED") return prev;
                return Object.assign({}, prev, {
                  GET_MESSAGE_QUERY: [data, ...prev.GET_MESSAGE_QUERY].slice(
                    0,
                    20
                  )
                });
              }
            });
          return (
            <>
              <MessageListView data={data} subscribeToMore={more} />;
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
            </>
          );
        }}
      </Query>
    );
  }
}

export default JoinArticle;
