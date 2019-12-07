import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import { createGlobalStyle } from "styled-components";
import * as Sentry from '@sentry/browser';

import Page from "../components/Page";
import withData from "../lib/withData";

// Config de Sentry
Sentry.init({
  dsn: "https://1e0c685fd42d444bb935c3821411e5c6@sentry.io/1540930"
});


class MonApp extends App {
  // getInitialProps
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }
  // Sentry
  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }
  // Render
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page client={apollo}>
            <GlobalStyle />
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

const GlobalStyle = createGlobalStyle`
      @font-face {
        font-family: "robotoregular";
        src: url("../static/roboto-regular-webfont.woff2") format("woff2");
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: "robotolight";
        src: url("../static/roboto-light-webfont.woff2") format("woff2");
        font-weight: normal;
        font-style: normal;
      }
      html {
        font-family: "robotoregular";
        box-sizing: border-box;
        font-size: 10px;
      }
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
      body {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 1.5;
      }
      a,
      a:focus,
      a:visited {
        text-decoration: none;
        color: #494949;
      }
      /* Sweet Alert */
      .popup-class-swal {
        font-size: 1em !important;
      }
      .confirm-button-swal {
        background-color: #4d5792 !important;
        border: none;
      }
      .swal2-styled.confirm-button-swal:active,
      .swal2-styled.confirm-button-swal:focus {
        background-image: initial !important;
        box-shadow: none !important;
      }
      .swal2-styled.confirm-button-swal:hover {
        opacity: 0.8;
      }
`;

export default withData(MonApp);
