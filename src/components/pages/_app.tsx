import * as i from 'types';
import React from 'react';
import App, { AppInitialProps, AppProps, AppContext } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { RouterContextProvider } from 'hooks';
import { GlobalStyling } from 'styles';
import theme from 'styles/theme';

class NextApp extends App<Props> {
  static getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
    let pageProps = {};

    // Execute the component's getInitialProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <GlobalStyling />
        <RouterContextProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </RouterContextProvider>
      </>
    );
  }
}

type Props = AppInitialProps & AppProps & {
  reduxStore: i.Store;
}

export default NextApp;
