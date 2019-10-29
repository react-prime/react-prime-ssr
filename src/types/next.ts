import * as i from 'types';
import { NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';
import { Response, Request } from 'express';

export type AugmentedNextPageContext<Q = {}> = NextPageContext & {
  store: i.Store;
  query: Q;
}

type NextPageComponentReturn = Partial<AppInitialProps>;

export type NextPageComponent<P = {}, Q = {}> = React.FC<P> & {
  getInitialProps?(context: AugmentedNextPageContext<Q>): Promise<NextPageComponentReturn>;
}
