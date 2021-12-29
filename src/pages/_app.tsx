import * as i from 'types';
import * as React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { RouterContextProvider } from 'hooks';
import { GlobalStyling } from 'styles';
import theme from 'styles/theme';

const App: React.VFC<Props> = ({ Component, pageProps: { state, ...pageProps } }) => {
  // This ensures that data is not shared between different users and requests,
  // while still only creating the QueryClient once per component lifecycle.
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000, // 30 seconds
        cacheTime: 1000 * 6 * 10, // 10 minutes
        retry: false,
        notifyOnChangeProps: 'tracked',
      },
    },
  }));

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10" />
        <link rel="manifest" href="/_next/static/manifest.json" />
        <link rel="icon" sizes="192x192" href="/_next/static/favicon.ico" />
      </Head>
      <GlobalStyling />
      <RouterContextProvider>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={state}>
              <Component {...pageProps} />
            </Hydrate>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ThemeProvider>
      </RouterContextProvider>
    </>
  );
};

type Props = Omit<AppProps, 'pageProps'> & {
  pageProps: i.AnyObject & {
    state: DehydratedState;
  };
};

export default App;
