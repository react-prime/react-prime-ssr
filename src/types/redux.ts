/* eslint-disable @typescript-eslint/no-explicit-any */
import * as i from 'types';
import { Store as ReduxStore } from 'redux';
import { ThunkAction as IThunkAction, ThunkDispatch as IThunkDispatch } from 'redux-thunk';

/*
  Store type
*/
export type Store = ReduxStore<i.ReduxState, i.Action> & {
  dispatch: i.ThunkDispatch;
};

/*
  Shape of a Redux action
  P = shape of payload
*/
export type Action<P = any> = {
  type: string;
  payload?: P;
  error?: boolean;
  meta?: any;
};

/*
  Thunk action type with pre-filled generics
  ReturnType = return type of function
*/
type ExtraArgument = {};
export type ThunkAction<ReturnType = void> = IThunkAction<ReturnType, i.ReduxState, ExtraArgument, i.Action>;

/*
  Thunk Dispatch action with pre-filled generics
*/
export type ThunkDispatch = IThunkDispatch<i.ReduxState, any, i.Action>;

/*
  Generator type for thunk actions
*/
export type BaseThunkAction<Fn extends (...args: any) => any> =
  (...args: Parameters<Fn>) => i.ThunkAction<ReturnType<Fn>>;
