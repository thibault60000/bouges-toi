import React from 'react';
import ReadRubrique from "../../components/Rubriques/ReadRubrique";

const Rubrique = props => {
    return (
        <div>
            <ReadRubrique id={props.query.id} />
        </div>
    );
}

export default Rubrique;
