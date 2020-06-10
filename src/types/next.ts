import * as i from 'types';
import { NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';
import { O } from 'ts-toolbelt';

export type AugmentedNextPageContext<Q = {}> = O.Update<NextPageContext, 'query', Q>

export type AugmentedNextPageContextWithRedux<Q = {}> = AugmentedNextPageContext<Q> & {
  store: i.Store;
}

type NextPageComponentReturn<P = {}> = Partial<AppInitialProps> & P;

type NextPageBaseProps<C, P> = React.FC<P> & {
  getInitialProps?(context: C): Promise<NextPageComponentReturn<P>> | NextPageComponentReturn<P>;
}

export type NextPageComponent<P = {}, Q = {}> = NextPageBaseProps<AugmentedNextPageContext<Q>, P>;

export type NextPageReduxComponent<P = {}, Q = {}> = NextPageBaseProps<AugmentedNextPageContextWithRedux<Q>, P>;
