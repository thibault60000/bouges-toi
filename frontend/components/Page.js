import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";

import Header from "./Header";
import Meta from "./Meta";

const theme = {
  primary: "#673AB7",
  second: "#ebebeb",
  text: "#494949",
  textWhite: "#fff",
  maxWidth: "1200px",
  boxS: "0 10px 20px 0 rgba(0, 0, 0, 0.08)",
  violet: "#454B73",
  violetDark: "#21253F",
  violetBlack: "#1C1F36",
  whiteText: "#FFFFFF",
  whiteVioletText: "#4C546D",
  orange: "#FF460F",
  jaune: "#FFC50D",
  bleuClair: "#53D7E4",
  bleu: "#3D4EDE",
  vert: "#75A500",
  darkText: "#4F5770",
  // news
  bt_blue: "#9BD1F2",
  bt_brown: "#8C5C03",
  bt_orange: "#F27405",
  bt_red: "#D9501E",
  bt_dark_red: "#400101",
  bt_text_black: "494949",
  bt_text_white: "#fff",
  bt_shadow: "2px 1px 7px 1px rgba(39, 35, 35, 0.08)"
};

const StyledPage = styled.div`
  color: ${props => props.theme.text};
  background-color: #fefefe;
`;

const StyledPageContent = styled.div`
   /*  max-width: ${props => props.theme.maxWidth}; */
    margin: 0 auto;
    padding: 1.5rem;
    
    
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <StyledPageContent>{this.props.children}</StyledPageContent>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
