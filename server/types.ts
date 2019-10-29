import * as i from 'types';
import { Registry } from 'next-routes';
import { Router, NextRouter } from 'next/router';
import { routeNames } from 'server/routeNames';

export type Router = Registry & {
  push: NextRouter['push'];
  routes: {
    name: string;
    page: string;
  }[];
}

export type RouteNames = i.ValueOf<typeof routeNames>;
