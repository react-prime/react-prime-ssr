/* eslint-disable @typescript-eslint/no-explicit-any */
import * as i from 'types';
import { Store as ReduxStore, CombinedState } from 'redux';
import { ThunkAction as IThunkAction, ThunkDispatch as IThunkDispatch } from 'redux-thunk';
import type { HYDRATE } from 'next-redux-wrapper';
import { ActionType, EmptyAction, PayloadAction, PayloadMetaAction } from 'typesafe-actions';

import * as reducers from 'ducks';

/** Store type. */
export type Store = ReduxStore<CombinedState<i.ReduxState>, i.ActionTypes> & {
  dispatch: i.ThunkDispatch;
};

/** Generates a list of all actions types. */
export type ActionTypes = i.ValueOf<{
  [Reducer in keyof typeof reducers]: Parameters<typeof reducers[Reducer]>[1];
}>;

/** Generates a union of all action names. */
export type ActionTypeNames = i.ValueOf<{
  [Reducer in keyof typeof reducers]: Parameters<typeof reducers[Reducer]>[1]['type'];
}>;

/** Shape of a Redux action. */
export type Action<P = any> = {
  type: i.ActionTypeNames;
  payload?: P;
  error?: boolean;
  meta?: any;
};

type HydrateAction<N extends string, S> = {
  type: typeof HYDRATE;
  payload: Record<N, S>;
};

export type Reducer<
  N extends string,
  S extends i.AnyObject,
  A extends Record<string, (...args: any) => EmptyAction<any> | PayloadAction<any, any> | PayloadMetaAction<any, any, any>>
> =
  (
    state: S,
    action: HydrateAction<N, S> | ActionType<A>,
  ) => S;

/** Thunk action type with pre-filled generics. */
type ExtraArgument = i.AnyObject;
export type ThunkAction<ReturnType = void> = IThunkAction<ReturnType, i.ReduxState, ExtraArgument, i.Action>;

/** Thunk Dispatch action with pre-filled generics. */
export type ThunkDispatch = IThunkDispatch<i.ReduxState, any, i.Action>;

/** Generator type for thunk actions. */
export type BaseThunkAction<Fn extends (...args: any) => any> =
  (...args: Parameters<Fn>) => i.ThunkAction<ReturnType<Fn>>;
