import * as i from 'types';
import type { NextComponentType, NextPageContext } from 'next';
import type { O } from 'ts-toolbelt';

export type AugmentedNextPageContext<Q = i.StringKeyObject> = O.Update<NextPageContext, 'query', Q>;

export type AugmentedNextPageContextWithRedux<Q = i.StringKeyObject> = AugmentedNextPageContext<Q> & {
  store: i.Store;
};

export type NextPageBaseComponent<P, C> = NextComponentType<C, i.StringKeyObject, P>;

export type NextPageComponent<P = i.StringKeyObject, Q = i.StringKeyObject> =
  NextPageBaseComponent<P, AugmentedNextPageContext<Q>>;

export type NextPageReduxComponent<P = i.StringKeyObject, Q = i.StringKeyObject> =
  NextPageBaseComponent<P, AugmentedNextPageContextWithRedux<Q>>;
