import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as appReducers from 'ducks';
import isServer from 'services/isServer';

const store = (initialState = {}) => {
  let middleware = applyMiddleware(thunk);
  const reducers = combineReducers({ ...appReducers });

  if (
    !__PROD__
    && !isServer
    && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function'
  ) {
    middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(reducers, initialState, middleware);
};

export default store;
