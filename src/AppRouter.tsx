import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import CharacterList from './Pages/CharacterList';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<CharacterList />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
