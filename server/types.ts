import { Registry } from 'next-routes';
import { NextRouter } from 'next/router';
import routes from 'server/routes';

export type RouteOptions = Parameters<Registry['add']>[0];

export type Router = Registry & {
  push: NextRouter['push'];
  routes: RouteOptions[];
}

export type RouteNames = typeof routes[number]['name'];
