import React from "react";
import UpdateArticle from "../../components/Articles/UpdateArticle";

const UpdateArticlePage = ({ query }) => (
    <div>
        <UpdateArticle id={query.id} />
    </div>
)

export default UpdateArticlePage;
 