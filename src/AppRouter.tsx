import { BrowserRouter, Route, Routes } from 'react-router-dom';
import type { FilterParams } from './services/Characters';
import { ProtectedLayout } from './ProtectedLayout';
import { Suspense, useState } from 'react';
import { lazy } from 'react';
import './CSS/main.scss';
import { Loader } from './Components/Loader/Loader';

const CharacterList = lazy(() => import('./Pages/CharacterList'));
const Favorites = lazy(() => import('./Pages/Favorites'));
const Login = lazy(() => import('./Pages/Login/Login'));

function AppRouter() {
  const [filters, setFilters] = useState<FilterParams>({});
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Todo: use a layout component that handles Header Sidebar and Content */}
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
