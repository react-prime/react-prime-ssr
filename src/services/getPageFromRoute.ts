import Router from 'router';

export const getPageFromRoute = (routeName: string) => {
  let name = routeName;

  if (name.charAt(0) === '/') name = name.slice(1);

  const route = Router.routes.find((route) => route.name === name);

  return route ? route.page : null;
};
