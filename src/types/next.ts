import * as i from 'types';
import { NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';
import { O } from 'ts-toolbelt';

export type AugmentedNextPageContext<Q = i.StringKeyObject> = O.Update<NextPageContext, 'query', Q>

export type AugmentedNextPageContextWithRedux<Q = i.StringKeyObject> = AugmentedNextPageContext<Q> & {
  store: i.Store;
}

type NextPageComponentReturn<P = i.StringKeyObject> = Partial<AppInitialProps> & P;

export type NextPageBaseComponent<P, C> = React.ComponentType<P> & {
  getInitialProps?(context: C): Promise<NextPageComponentReturn<P>> | NextPageComponentReturn<P>;
}

export type NextPageComponent<P = i.StringKeyObject, Q = i.StringKeyObject> =
  NextPageBaseComponent<P, AugmentedNextPageContext<Q>>;

export type NextPageReduxComponent<P = i.StringKeyObject, Q = i.StringKeyObject> =
  NextPageBaseComponent<P, AugmentedNextPageContextWithRedux<Q>>;
