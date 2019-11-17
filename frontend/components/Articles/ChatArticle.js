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
  query GET_MESSAGE_QUERY($id: ID!) {
    messages(id: $id) {
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
      article {
        id
      }
    }
  }
`;

const SEND_MESSSAGE_MUTATION = gql`
  mutation SEND_MESSSAGE_MUTATION($title: String!, $articleId: String!) {
    createMessage(title: $title, articleId: $articleId) {
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
        {/* Récupération de l'utilisateur courant */}
        <User>
          {({ data: { me } }) =>
            me ? (
              me && me.id !== this.props.article.user.id ? (
                this.props.article.users.some(u => u.id === me.id) ? (
                  <>
                    {/* Récupère les commentaire de l'article */}
                    <Query
                      query={GET_MESSAGE_QUERY}
                      variables={{ id: this.props.article.id }}
                    >
                      {({ data, loading, error }) => {
                        if (loading) return <p>Chargement ...</p>;
                        if (error) return <p>Erreur !</p>;
                        return data.messages.length ? (
                          /* Styled Component regroupant les messages */
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
                                  <span>
                                    {" "}
                                    {moment(message.createdAt).format(
                                      "Do MMMM YYYY - HH:mm"
                                    )}{" "}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </StyledChatArticle>
                        ) : (
                          /* S'affiche lorsqu'il y a 0 messages sur l'article */
                          <div> Aucun message</div>
                        );
                      }}
                    </Query>
                    {/* Mutation permettant de créer un message */}
                    <Mutation
                      mutation={SEND_MESSSAGE_MUTATION}
                      variables={{
                        articleId: this.props.article.id,
                        title: this.state.title
                      }}
                      refetchQueries={[
                        {
                          query: GET_MESSAGE_QUERY,
                          variables: { id: this.props.article.id }
                        }
                      ]}
                    >
                      {createMessage => (
                        <StyledForm>
                          <fieldset>
                            <label className="msg" htmlFor="title">
                              {" "}
                              Ecrire un message{" "}
                            </label>
                            <input
                              type="text"
                              value={this.state.title}
                              onChange={this.handleChange}
                              id="title"
                              name="title"
                              placeholder="Message"
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
                ) : (
                  /* Message ne s'affichant que lorsqu'on est connecté mais qu'on ne fait pas parti de l'article */
                  <p>
                    Vous devez rejoindre l'article pour participer au fil de
                    discussion de celui-ci
                  </p>
                )
              ) : null
            ) : (
              <>
                {/* Message ne s'affichant que lorsque l'on ai pas connecté */}
                <p>
                  Vous devez être connecté pour voir et/ou écrire un commentaire
                </p>
              </>
            )
          }
        </User>
      </>
    );
  }
}

export default ChatArticle;
