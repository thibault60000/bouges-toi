import styled from "styled-components";

const rubrique = styled.li`
    background: white;
    display: flex;
    flex-direction: column;
    padding: 1rem 1.8rem 0;
    position: relative;
    border: 1px solid #ebebeb;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
    img {
        width: 100%;
        height: 250px;
        object-fit: cover;
    }
    p {
        font-size: 1.4rem;
        line-height: 2;
        flex-grow: 1;
        padding: 0.1rem 0.3rem;
    }
    .actionButtons {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        grid-gap: 1px;
        width: 100%;
        /* Enfants du actionButtons */
        & > * {
            background-color: #673AB7;
            color: white;
            padding: 1rem;
            width: 90%;
            margin: 0.3rem auto 1rem;
            font-size: 1.2rem;
            border: 0;
            cursor: pointer;
            border-radius: 3px;
            :hover {
                opacity: 0.8;
            }
        }
    }
`;



export default rubrique;