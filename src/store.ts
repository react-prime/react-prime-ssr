import * as i from 'types';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { createWrapper, Context } from 'next-redux-wrapper';
import thunk from 'redux-thunk';

import * as reducers from 'ducks';

import { isServer } from 'services';

const makeStore = (context: Context): i.Store => {
  let middleware = applyMiddleware(thunk);
  const combinedReducers = combineReducers(reducers);

  if (
    !__PROD__
    && !isServer
    && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function'
  ) {
    middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(combinedReducers, {}, middleware);
};

export const wrapper = createWrapper<i.Store>(makeStore);

export default makeStore;
