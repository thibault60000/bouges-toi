import React from "react";
import CreateRubrique from "../../components/Rubriques/CreateRubrique";
import PleaseSignIn from "../../components/Authentication/PleaseSignIn";

const CreateRubriquePage = props => (
    <div>
        <PleaseSignIn>
            <CreateRubrique />
        </PleaseSignIn>
    </div>
)

export default CreateRubriquePage;
 