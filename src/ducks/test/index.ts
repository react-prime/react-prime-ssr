/**
 * This is an example file from react-prime
 */
import * as i from 'types';
import { HYDRATE } from 'next-redux-wrapper';
import { action } from 'typesafe-actions';

export const testActions = {
  load: () => action('test/GET'),
  success: (success: boolean) => action('test/GET_SUCCESS', success),
  failed: () => action('test/GET_FAILED'),
} as const; // <-- Important if you don't want to explicitly type the return type of all actions

const initialState: i.TestState = {
  data: null,
  error: false,
  loading: false,
};

const reducer: i.Reducer<'test', i.TestState, typeof testActions> = (state = initialState, action) => {
  switch (action.type) {
    // HYDRATE is explained here:
    // https://github.com/kirill-konshin/next-redux-wrapper#state-reconciliation-during-hydration
    case HYDRATE:
      return {
        ...state,
        ...action.payload.test,
      };
    case 'test/GET':
      return {
        ...state,
        error: false,
        loading: true,
      };
    case 'test/GET_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: false,
        loading: false,
      };
    case 'test/GET_FAILED':
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const getData: i.GetData = () => async (dispatch) => {
  dispatch(testActions.load());

  return new Promise((res) => {
    setTimeout(() => {
      dispatch(testActions.success(true));
      res();
    }, 2000);
  });
};

export default reducer;
