import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { FilterParams } from "./modules/characters";
import { ProtectedLayout } from "./ProtectedLayout";
import { Suspense, useState } from "react";
import "./Styles/main.scss";
import { Loader } from "./Components/Loader/Loader";
import { Login } from "./pages/LoginPage/LoginPage";
import { CharacterList } from "./pages/CharacterListPage/CharacterListPage";
import { Favorites } from "./pages/FavoritesPage/FavoritesPage";

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
