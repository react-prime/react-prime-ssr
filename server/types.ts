import { Registry } from 'next-routes';
import { NextRouter } from 'next/router';
import routeNames from 'server/routeNames';

export type RouteOptions = Parameters<Registry['add']>[0];

export type Router = Registry & {
  push: NextRouter['push'];
  routes: {
    name: string;
    page: string;
  }[];
}

export type RouteNames = typeof routeNames[number]['name'];
