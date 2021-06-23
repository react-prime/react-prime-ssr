import * as i from 'types';

import { testActions } from '.';

export type TestState = {
  data: boolean | null;
  error: boolean;
  loading: boolean;
};

// Duck name, State struct type, typeof actions object
export type TestReducer = i.Reducer<'test', i.TestState, typeof testActions>;

export type GetData = i.BaseThunkAction<() => Promise<void>>;
