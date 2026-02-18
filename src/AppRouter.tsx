import { BrowserRouter, Route, Routes } from "react-router-dom";

import type { IFilterParams } from "./modules/characters/characters.types";
// import { ProtectedLayout } from "./ProtectedLayout";
import { AppLayout } from "./Components/AppLayout/AppLayout";
import { Suspense, useState } from "react";
import "./Styles/main.scss";
import { Loader } from "./Components/Loader/Loader";
import { Login } from "./pages/LoginPage/LoginPage";
import { CharacterList } from "./pages/CharacterListPage/CharacterListPage";
import { Favorites } from "./pages/FavoritesPage/FavoritesPage";

function AppRouter() {
  const [filters, setFilters] = useState<IFilterParams>({});
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Todo: use a layout component that handles Header Sidebar and Content */}
          {/* UNCOMENT FOR REMOVING LAYOUT */}
          {/* <Route element={<ProtectedLayout />}> */}

          <Route element={<AppLayout />}>
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
