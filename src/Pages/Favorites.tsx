import { Header } from '../Components/Header';
import { SubHeader } from '../Components/SubHeader';
import type { FilterParams } from '../services/Characters';
import type { Dispatch, SetStateAction } from 'react';
import { favoritesStore } from '../favorites.store';
import { observer } from 'mobx-react-lite';
import '../CSS/characters.scss';

type Props = {
  filters: FilterParams;
  setFilters: Dispatch<SetStateAction<FilterParams>>;
};

const Favorites = observer(({ filters, setFilters }: Props) => {
  return (
    <div>
      <Header setFilters={setFilters} />
      <SubHeader filters={filters} setFilters={setFilters} />
      <div>
        <h1 style={{ textAlign: 'center', margin: '20px 0' }}>My Favorites</h1>
        {favoritesStore.favorites.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>
            No favorites yet. Click the heart icon on characters to add them
            here!
          </p>
        ) : (
          <div className="charactersGrid">
            {favoritesStore.favorites.map((character) => (
              <div key={character.id} className="character-card">
                <img
                  className="characterImage"
                  src={character.image}
                  alt={character.name}
                />
                <p>{character.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default Favorites;
