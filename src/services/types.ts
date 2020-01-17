import * as i from 'types';
import { NextPageContext } from 'next';

export type AugmentedNextPageContext = NextPageContext & {
  store: i.Store;
}
