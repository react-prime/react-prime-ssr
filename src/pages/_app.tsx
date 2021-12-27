import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { GlobalStyling } from 'styles';
import theme from 'styles/theme';
import { SafeHydrate } from 'services';

import Component from './index';

const App: React.VFC<AppProps> = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10" />
        <link rel="manifest" href="/_next/static/manifest.json" />
        <link rel="icon" sizes="192x192" href="/_next/static/favicon.ico" />
      </Head>
      <SafeHydrate>
        <GlobalStyling />
        <ThemeProvider theme={theme}>
          <Component />
        </ThemeProvider>
      </SafeHydrate>
    </>
  );
};

export default App;
