import React from 'react';
import Articles from "../../components/Articles/Articles";

const ArticlesPage = props => {
    return (
        <div>
            <Articles page={parseFloat(props.query.page) || 1} />
        </div>
    );
}

export default ArticlesPage;
