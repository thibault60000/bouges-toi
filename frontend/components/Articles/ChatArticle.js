import React, { Component } from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import classnames from "classnames";
import { Mutation, Query } from "react-apollo";
import moment from "moment";
import StyledForm from "../styles/StyledForm";
import User from "../Authentication/User";
moment.locale("fr");

const StyledChatArticle = styled.div`
  margin: 3rem 0 1rem;
  display: flex;
  flex-direction: column;
  & > div.container {
    display: flex;
    width: 100%;
    margin-bottom: 1.5rem;
    > div {
      border-radius: 5px;
      background-color: #efe5e5;
      display: flex;
      position: relative;
      padding: 0.7rem;
      width: 50%;
    }
    &.left {
      justify-content: flex-start;
    }
    &.right {
      justify-content: flex-end;
      > div {
        background-color: #f3f1f1;
      }
    }

    > div span {
      position: absolute;
      font-style: italic;
      bottom: 1rem;
      right: 1rem;
      color: dimgrey;
    }
  }
  img {
    border-radius: 50%;
    object-fit: cover;
    height: 6rem;
    width: 6rem;
  }
  p {
    margin: 0 0 0.5rem 1.5rem;
  }
`;

const GET_MESSAGE_QUERY = gql`
  query GET_MESSAGE_QUERY {
    messages {
      id
      title
      createdAt
      updatedAt
      user {
        id
        name
        surname
        email
        picture
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
        <User>
          {({ data: { me } }) => (
            <>
              <Mutation
                mutation={SEND_MESSSAGE_MUTATION}
                variables={this.state}
              >
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
              <Query query={GET_MESSAGE_QUERY}>
                {({ data, loading, error }) => {
                  console.log("DATA", data);
                  if (loading) return <p>Chargement ...</p>;
                  if (error) return <p>Erreur !</p>;
                  return data.messages.length ? (
                    <StyledChatArticle>
                      {data.messages.map((message, index) => (
                        <div
                          key={`messageNumber${index}`}
                          className={classnames("container", {
                            right: message.user.id !== me.id,
                            left: message.user.id === me.id
                          })}
                        >
                          <div>
                            <img
                              src={message.user.picture}
                              alt={message.user.name}
                            />
                            <p> {message.title} </p>
                            <span> {moment(message.createdAt).format("Do MMMM YYYY - HH:mm")} </span>
                          </div>
                        </div>
                      ))}
                    </StyledChatArticle>
                  ) : (
                    <div> Aucun message</div>
                  );
                }}
              </Query>
            </>
          )}
        </User>
      </>
    );
  }
}

export default ChatArticle;
