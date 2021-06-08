import * as i from 'types';

export type TestState = {
  data: boolean | null;
  error: boolean;
  loading: boolean;
};

export type GetData = i.BaseThunkAction<() => Promise<void>>;
