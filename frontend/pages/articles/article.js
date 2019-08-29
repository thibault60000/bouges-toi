import React from 'react';
import ReadArticle from "../../components/Articles/ReadArticle";

const Article = props => {
    return (
        <div>
            <ReadArticle id={props.query.id} />
        </div>
    );
}

export default Article;
