import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

import { GlobalStyling } from 'styles';
import theme from 'styles/theme';
import { SafeHydrate } from 'services';

import Component from './index';

const queryClient = new QueryClient();

const App: React.VFC<AppProps> = () => {
  return (
    <>
      <Head>
        <meta name="description" content="React Prime Boilerplate" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10" />
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <link rel="manifest" href="/_next/static/manifest.json" />
        <link rel="icon" sizes="192x192" href="/_next/static/favicon.ico" />
        <title>React Prime</title>
      </Head>
      <SafeHydrate>
        <GlobalStyling />
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Component />
          </QueryClientProvider>
        </ThemeProvider>
      </SafeHydrate>
    </>
  );
};

export default App;
