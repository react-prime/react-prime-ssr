import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import withReduxStore from 'services/withReduxStore';
// import registerServiceWorker from 'services/registerServiceWorker';

import theme from 'styles/theme';
import GlobalStyling from 'styles';

class LabelApp extends App {
  componentDidMount() {
    // registerServiceWorker();
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <>
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

export default withReduxStore(LabelApp);

// export default LabelApp;
