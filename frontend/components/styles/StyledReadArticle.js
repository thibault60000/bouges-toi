import styled from "styled-components";

const StyledReadArticle = styled.div`
  padding: 1.5rem;
  max-width: ${props => props.theme.maxWidth};
  margin: 2rem auto;
  box-shadow: ${props => props.theme.boxS};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  img {
    object-fit: cover;
  }
  section.articleImg {
    width: 30%;
    padding: 2.7rem;
    img {
      max-width: 100%;
      border-radius: 3px;
    }
  }
  section.actions {
    display: block;
    padding: 0.5rem;
    width: 100%;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      li {
        list-style: none;
        margin: 0.5rem 1rem;

        > * {
          border: none;
          padding: 1.6rem 1.9rem;
          font-weight: bold;
          font-size: 1.4rem;
          background-color: #1c1f36;
          color: #4c546d;
          border-radius: 5px;
          :hover {
            cursor: pointer;
            opacity: 0.8;
          }
          &.exit {
            background-color: #4d70b9;
            color: white;
          }
          &[disabled] {
            background-color: #8c8c8c;
            color: #c3c3c3;
            :hover {
              opacity: 1;
              cursor: default;
            }
          }
        }
        > a {
          display: inline-block;
          background-color: #454b73;
          color: white;
          padding: 1.35rem 2.85rem;
        }
      }
    }
  }

  section.description {
    width: 40%;
    padding-right: 5rem;
    p.desc {
      margin: 0.2rem 0 2rem;
      font-style: italic;
    }
    div.articleDates {
      p {
        margin: 0;
        &.adresse {
          margin-top: 1.5rem;
          color: #ff460f;
          font-weight: bold;
        }
      }
    }
  }
  section.participants {
    width: 30%;

    p.nbParticipants {
      background-color: rgb(69, 75, 115);
      color: white;
      font-weight: bold;
      border-radius: 15px;
      display: inline-block;
      font-size: 1.5rem;
      padding: 0.5rem 1.7rem;
      margin-top: 2.2rem;
    }
    ul.participantsList {
      margin: 1.4rem 0 0;
      padding: 0;
      margin: 1.4rem 0 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      li {
        list-style: none;
        margin: 0.5rem;
        text-align: center;
        overflow: hidden;
        max-width: 100px;
        img {
          width: 80px;
          border-radius: 5px;
          height: 75px;
        }
        span {
          display: inline-block;
          font-weight: bold;
          line-height: 1.3rem;
          margin: 0.2rem 0 0.5rem;
          word-break: break-word;
          text-overflow: ellipsis;
        }
      }
    }
  }
  footer {
    display: block;
    width: 100%;
    background-color: #f3f1f1;
    border-radius: 2px;
    text-align: right;
    padding-right: 1rem;
    p {
      margin: 1.4rem 0;
      a,
      strong {
        font-weight: bold;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default StyledReadArticle;