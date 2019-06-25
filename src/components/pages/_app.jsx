import React from 'react';
import App, { Container } from 'next/app';
// import { Provider } from 'react-redux';
// import { ThemeProvider } from 'styled-components';

// import withReduxStore from 'services/withReduxStore';
// import registerServiceWorker from 'services/registerServiceWorker';

// import GlobalStyling from 'app/styles';
// import theme from 'app/styles/theme';

class LabelApp extends App {
  componentDidMount() {
    // registerServiceWorker();
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <>
        {/* <GlobalStyling /> */}
        {/* <ThemeProvider theme={theme}> */}
          {/* <ErrorBoundary> */}
            <Container>
              {/* <Provider store={reduxStore}> */}
                <Component {...pageProps} />
              {/* </Provider> */}
            </Container>
          {/* </ErrorBoundary> */}
        {/* </ThemeProvider> */}
      </>
    );
  }
}

// export default withReduxStore(LabelApp);

export default LabelApp;
