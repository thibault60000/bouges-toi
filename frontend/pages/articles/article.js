import React from "react";
import ReadArticle from "../../components/Articles/ReadArticle";
import User from "../../components/Authentication/User";

const Article = props => {
  return (
    <User>{({ data: { me } }) => <ReadArticle me={me} id={props.query.id} />}</User>
  );
};

export default Article;
