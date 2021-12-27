import * as React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const Home = React.lazy(() => import('./Home'));
const Data = React.lazy(() => import('./Data'));

const Component: React.VFC = () => {
  return (
    <BrowserRouter>
      <main>
        <React.Suspense fallback={<span>loading</span>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data" element={<Data />} />
          </Routes>
        </React.Suspense>
      </main>
    </BrowserRouter>
  );
};

export default Component;
