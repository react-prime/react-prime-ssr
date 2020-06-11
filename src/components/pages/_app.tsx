import * as i from 'types';
import React from 'react';
import { AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { RouterContextProvider } from 'hooks';
import { theme, GlobalStyling } from 'styles';

const NextApp: React.FC<Props> = ({ Component }) => (
  <>
    <Head>
      <link rel="manifest" href="/_next/static/manifest.json" />
      <link rel="icon" sizes="192x192" href="/_next/static/favicon.ico" />
    </Head>

    <GlobalStyling />
    <RouterContextProvider>
      <ThemeProvider theme={theme}>
        <Component />
      </ThemeProvider>
    </RouterContextProvider>
  </>
);

type Props = AppInitialProps & AppProps & {
  reduxStore: i.Store;
}

export default NextApp;
