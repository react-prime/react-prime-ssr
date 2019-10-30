import React, { createContext, useContext } from 'react';
import { withRouter, SingletonRouter } from 'next/router';

const RouterContext = createContext({} as SingletonRouter);

const Provider: React.FC<ProviderProps> = ({ router, children }) => (
  <RouterContext.Provider value={router!}>{children}</RouterContext.Provider>
);

type ProviderProps = {
  router: SingletonRouter;
}

const useRouter = () => useContext(RouterContext);

export const RouterContextProvider = withRouter(Provider);
export default useRouter;
