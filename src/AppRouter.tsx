import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import CharacterList from './Pages/CharacterList';
import { ProtectedLayout } from './ProtectedLayout';
import './CSS/main.scss';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<CharacterList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
