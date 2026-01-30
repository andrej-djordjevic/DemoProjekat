import '../CSS/header.scss';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../auth.store';
import { useState } from 'react';
import type { FilterParams } from '../services/Characters';

interface Props {
  setFilters: (f: FilterParams) => void;
}

export const Header = observer(({ setFilters }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    authStore.logout();
    navigate('/login');
    setOpen(false);
  };

  return (
    <>
      <header className="app-header">
        <div className="logo">LOGO</div>

        <button
          className={`burger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`burger-menu ${open ? 'open' : ''}`}>
          <button
            id="overlayBtn"
            onClick={() => {
              setFilters({
                name: '',
                species: '',
                status: '',
                gender: '',
              });
              navigate('/favorites');
            }}
          >
            favorites
          </button>
          <button id="overlayBtn" onClick={logout}>
            log out
          </button>
        </nav>
      </header>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
});
