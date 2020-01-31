import * as i from 'types';
import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';

import initializeStore from 'store';
import { AugmentedNextPageContext } from './types';

export const withRedux = (PageComponent: i.NextPageComponent, { ssr = true } = {}) => {
  const WithRedux = ({ initialReduxState, ...props }) => {
    const store = getOrInitializeStore(initialReduxState);

    return (
      <Provider store={store}>
        <PageComponent {...props} />
      </Provider>
    );
  };

  // Make sure people don't use this HOC on _app
  if (!__PROD__) {
    // @ts-ignore Example is from NextJS but errors in TypeScript ("always false" error). Will leave as is.
    const isAppHoc = PageComponent === App || PageComponent.prototype instanceof App;

    if (isAppHoc) {
      console.error('The withRedux HOC should not be used on _app.tsx as it will reduce performance.');
    }
  }

  // Set the correct displayName in development
  if (!__PROD__) {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    WithRedux.displayName = `withRedux(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithRedux.getInitialProps = async (context: AugmentedNextPageContext) => {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrInitializeStore();

      // @ts-ignore Provide the store to getInitialProps of pages
      context.store = reduxStore;

      // Run getInitialProps from HOCed PageComponent
      const pageProps = typeof PageComponent.getInitialProps === 'function'
        ? await PageComponent.getInitialProps.call(PageComponent, context)
        : {};

      // Pass props to PageComponent
      return {
        ...pageProps,
        initialReduxState: reduxStore.getState(),
      };
    };
  }

  return WithRedux;
};


let reduxStore: i.Store;

const getOrInitializeStore = (initialState?: {}): i.Store => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === 'undefined') {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initializeStore(initialState);
  }

  return reduxStore;
};
