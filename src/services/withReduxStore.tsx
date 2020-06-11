import * as i from 'types';
import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';

import initializeStore from 'store';
import { AugmentedNextPageContext } from './types';

/**
 * @NOTE Only wrap Page components!
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withRedux<T extends i.NextPageBaseComponent<any, any>>(PageComponent: T): WithReduxComponent {
  const WithRedux: WithReduxComponent = ({ initialReduxState, ...props }) => {
    const store = getOrInitializeStore(initialReduxState);

    /**
     * This conversion is possible without any issues, so there is a type issue somewhere deeper.
     * Possibly from @react/types
     * */
    const Component = PageComponent as React.ComponentType;

    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };

  // Make sure people don't use this HOC on _app
  if (!__PROD__) {
    // @ts-ignore Example is from NextJS but errors in TypeScript ("always false" error). Will leave as is.
    const isAppHoc = PageComponent === App || PageComponent.prototype instanceof App;

    if (isAppHoc) {
      console.error('The withRedux HOC should not be used on _app.tsx as it will reduce performance.');
      console.error('withRedux should only be used on individual pages and only when necessary.');
    }

    // Set the correct displayName in development
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    WithRedux.displayName = `withRedux(${displayName})`;
  }

  if (PageComponent.getInitialProps) {
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
}


let reduxStore: i.Store;

const getOrInitializeStore = (initialState?: i.ReduxState) => {
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

type WithReduxComponent = i.NextPageComponent<{
  initialReduxState?: i.ReduxState;
}>;
