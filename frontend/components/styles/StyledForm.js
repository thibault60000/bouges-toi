import styled from "styled-components";

const StyledForm = styled.form`
    background: #FFC107;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
    padding: 0.2rem;
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: bold;
    border: 5px solid white;
    fieldset {
        border: 0;
        margin: 0;
        &[disabled] {
            opacity: 0.3
        }
    }
    input:not([type='date']):not([type='radio']),
    textarea,
    select {
        display:block;
        width: 75%;
        padding: 0.1rem 0.8rem;
        font-size: 1.4rem;
        margin-top: 0.7rem;
        line-height: 2;
        border: 0;
        border-radius: 2px;
        &:focus {
            outline: 2;
            border-color: black;
        }
    }
    input[type="date"] {
        display:block;
        padding: 0.1rem 0.8rem;
        font-size: 1.4rem;
        line-height: 2;
        border: 0;
        border-radius: 2px;
    }

    label {
        display: block;
        width: 100%;
        margin-bottom: 1.3rem;
        font-size: 1.8rem;
    }
    button,
    input[type="submit"] {
        background: white;
        color: #FFC107;
        cursor: pointer;
        font-weight: bold;
        border: 0;
        font-size: 1.8rem;
        border-radius: 2px;
        padding: 0.4rem 1rem;
        &:hover {
            opacity: 0.7;
        }
    }
    span.free {
        font-size: 1.2rem;
        margin-left: 0rem;
        font-family: "robotolight";
        font-style: italic;
        color: #795548;      
    }
`;

export default StyledForm;