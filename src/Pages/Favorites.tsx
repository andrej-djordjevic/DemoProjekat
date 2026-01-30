import { Header } from '../Components/Header';
import { SubHeader } from '../Components/SubHeader';
import type { FilterParams } from '../services/Characters';
import type { Dispatch, SetStateAction } from 'react';
import { favoritesStore } from '../favorites.store';
import { observer } from 'mobx-react-lite';
import '../CSS/characters.scss';
import { CharacterModal } from '../Components/CharacterModal';
import { useState } from 'react';
import type { Character } from '../services/Characters';

type Props = {
  filters: FilterParams;
  setFilters: Dispatch<SetStateAction<FilterParams>>;
};

const Favorites = observer(({ filters, setFilters }: Props) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  const filteredFavorites = favoritesStore.favorites.filter((character) => {
    if (
      filters.name &&
      !character.name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.species &&
      character.species.toLowerCase() !== filters.species.toLowerCase()
    ) {
      return false;
    }
    if (
      filters.status &&
      character.status.toLowerCase() !== filters.status.toLowerCase()
    ) {
      return false;
    }
    if (
      filters.gender &&
      character.gender.toLowerCase() !== filters.gender.toLowerCase()
    ) {
      return false;
    }
    return true;
  });
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
        ) : filteredFavorites.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>
            No favorites match the current filters.
          </p>
        ) : (
          <div className="charactersGrid">
            {filteredFavorites.map((character) => (
              <div
                key={character.id}
                className="character-card"
                onClick={() => handleCharacterClick(character)}
              >
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
      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
});

export default Favorites;
