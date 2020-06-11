import * as i from 'types';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from 'ducks';

import { isServer } from 'services';

const store = (initialState = {} as i.ReduxState): i.Store => {
  let middleware = applyMiddleware(thunk);
  const combinedReducers = combineReducers(reducers);

  if (
    !__PROD__
    && !isServer
    && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function'
  ) {
    middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(combinedReducers, initialState, middleware);
};

export default store;
