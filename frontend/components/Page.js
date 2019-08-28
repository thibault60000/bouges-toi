import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";

import Header from "./Header";
import Meta from "./Meta";

const theme = {
    primary: '#673AB7',
    second: '#ebebeb',
    text: '#494949',
    textWhite: '#fff',
    maxWidth: '1200px',
    boxS: '0 10px 20px 0 rgba(0, 0, 0, 0.08)'
};

const StyledPage = styled.div`
    color: ${props => props.theme.text};
`;

const StyledPageContent = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 1.5rem;
    
`;

class Page extends Component {
    render () {
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Meta />
                    <Header />
                    <StyledPageContent>
                        { this.props.children }
                    </StyledPageContent>
                </StyledPage>
            </ThemeProvider>
        )
    }
}

export default Page;
