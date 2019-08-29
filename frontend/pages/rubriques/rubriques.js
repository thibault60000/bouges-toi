import React from 'react';
import Rubriques from "../../components/Rubriques/Rubriques";

const RubriquesPage = props => {
    return (
        <div>
            <Rubriques page={parseFloat(props.query.page) || 1} />
        </div>
    );
}

export default RubriquesPage;
