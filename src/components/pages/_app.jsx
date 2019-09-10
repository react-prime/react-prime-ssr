import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import favicon from 'public/favicon.ico';

import withReduxStore from 'services/withReduxStore';

import theme from 'styles/theme';
import GlobalStyling from 'styles';

class NextApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <>
        <Head>
          <link rel="manifest" href="/_next/static/manifest.json" />
          <link rel="icon" sizes="192x192" href={favicon} />
        </Head>

        <GlobalStyling />
        <ThemeProvider theme={theme}>
          <Container>
            <Provider store={reduxStore}>
              <Component {...pageProps} />
            </Provider>
          </Container>
        </ThemeProvider>
      </>
    );
  }
}

export default withReduxStore(NextApp);
