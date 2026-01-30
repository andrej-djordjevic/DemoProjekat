import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import CharacterList from './Pages/CharacterList';
import { ProtectedLayout } from './ProtectedLayout';
import './CSS/main.scss';
import { useState } from 'react';
import Favorites from './Pages/Favorites';
import type { FilterParams } from './services/Characters';

function AppRouter() {
  const [filters, setFilters] = useState<FilterParams>({});
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
export default AppRouter;
