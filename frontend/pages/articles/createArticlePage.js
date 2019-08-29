import React from "react";
import CreateArticle from "../../components/Articles/CreateArticle";
import PleaseSignIn from "../../components/Authentication/PleaseSignIn";

const CreateArticlePage = props => (
    <div>
        <PleaseSignIn>
            <CreateArticle />
        </PleaseSignIn>
    </div>
)

export default CreateArticlePage;
 