import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { lazy } from 'react';
const Login = lazy(() => import('./Pages/Login'));
const CharacterList = lazy(() => import('./Pages/CharacterList'));
import { ProtectedLayout } from './ProtectedLayout';
import './CSS/main.scss';
const Favorites = lazy(() => import('./Pages/Favorites'));
import type { FilterParams } from './services/Characters';

function AppRouter() {
  const [filters, setFilters] = useState<FilterParams>({});
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedLayout />}>
            <Route
              path="/"
              element={
                <CharacterList filters={filters} setFilters={setFilters} />
              }
            />
            <Route
              path="/favorites"
              element={<Favorites filters={filters} setFilters={setFilters} />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default AppRouter;
