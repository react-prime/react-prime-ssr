import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const Data = lazy(() => import('./Data'));

const AppRoutes: React.FC = () => (
  <main>
    <Suspense fallback={<span>loading</span>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </Suspense>
  </main>
);

export default AppRoutes;
