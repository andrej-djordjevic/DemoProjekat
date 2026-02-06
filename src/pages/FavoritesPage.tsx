import { Header } from "../Components/Header/Header";
import { SubHeader } from "../Components/SubHeader/SubHeader";
import type { FilterParams } from "../modules/characters";
import type { Dispatch, SetStateAction } from "react";
import { observer } from "mobx-react-lite";
import { CharacterGrid } from "../Components/CharacterGrid";
import { CharacterModal } from "../Components/CharacterModal/CharacterModal";
import { useState } from "react";
import type { Character } from "../modules/characters";
import { favoritesStore } from "../stores/favorites.store";

// TODO: move in respective <PageName>Page folder

// Todo: Not props but I<ComponentName>Props, always export them never know when u gonna need it
export interface Props {
  filters: FilterParams;
  setFilters: Dispatch<SetStateAction<FilterParams>>;
}

export const Favorites = observer(({ filters, setFilters }: Props) => {
  // Todo: move to character.store
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  // Todo: make modal module with store and types
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  // Todo: move this to characters.service.ts it should look like:
  // const filteredFavorites = charactersService.filterFavorites(charaters)
  // see if u can compose this function out of multiple private .service helpers

  const filteredFavorites = favoritesStore.favorites.filter((character) => {
    if (
      filters.name &&
      !character.name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.species &&
      !character.species?.toLowerCase().includes(filters.species.toLowerCase())
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
      {/* Todo: Utilize ANTD Layout along with the Outlet component */}
      <Header setFilters={setFilters} />
      <SubHeader filters={filters} setFilters={setFilters} />
      <div>
        {/* Todo: Avoid inline styles if not a MUST for some reason */}
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>My Favorites</h1>
        {favoritesStore.favorites.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            No favorites yet. Click the heart icon on characters to add them
            here!
          </p>
        ) : filteredFavorites.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            No favorites match the current filters.
          </p>
        ) : (
          <CharacterGrid
            characters={filteredFavorites}
            onCharacterClick={handleCharacterClick}
          />
        )}
      </div>
      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        allowEditing={true}
      />
    </div>
  );
});

//Todo: we dont do default export unless required by framework (ie nextjs)
export default Favorites;
