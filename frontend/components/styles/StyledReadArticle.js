import styled from "styled-components";
import { ArrowBack } from "styled-icons/boxicons-regular/ArrowBack";

const StyledTitleReadArticle = styled.h3`
  display: inline-block;
  width: fit-content;
  font-size: 3.5rem;
  margin: 0.3rem 0 0;
  vertical-align: middle;
`;
const StyledBackButton = styled.button`
  display: inline-block;
  background: initial;
  width: 4.8rem;
  vertical-align: middle;
  height: 3.7rem;
  border: 2px solid #494949;
  border-radius: 3px;
  margin-right: 1.1rem;
  padding: 0 0.5rem 0;
  :hover {
    cursor: pointer;
    border: 2px solid #d9501e;
    background-color: #d9501e;
    svg {
      color: white;
    }
  }
`;

const StyledReadArticle = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  img {
    object-fit: cover;
  }
  section.articleImg {
    width: 60%;
    padding: 0.5rem;
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
    width: 100%;
    padding: 0.5rem;
    p.desc {
      max-width: 95%;
      overflow: hidden;
      text-overflow: ellipsis;
      font-style: italic;
      margin: 0.1rem 0 0.5rem;
      font-size: 1.6rem;
      color: rgb(69, 75, 115);
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
    p.nbParticipants {
      color: rgb(69, 75, 115);
      font-weight: bold;
      text-transform: uppercase;
      border-radius: 3px;
      border: 1px solid rgb(69, 75, 115);
      display: inline-block;
      font-size: 1.5rem;
      padding: 0.4rem 1.3rem;
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

const PreviousIcon = styled(ArrowBack)`
  height: 3.5rem;
  color: #494949;
`;

export {
  StyledReadArticle,
  StyledTitleReadArticle,
  PreviousIcon,
  StyledBackButton
};
