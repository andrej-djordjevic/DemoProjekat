import type { Dispatch, SetStateAction } from "react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import type { Character, FilterParams } from "../../modules/characters";
import { favoritesStore } from "../../modules/auth/favorites.store";
import { SubHeader } from "../../Components/SubHeader/SubHeader";
import { Header } from "../../Components/Header/Header";
import { CharacterGrid } from "../../Components/CharacterGrid/CharacterGrid";
import { CharacterModal } from "../../Components/CharacterModal/CharacterModal";
import { charactersService } from "../../modules/characters/characters.service";

export interface IFavoritesProps {
  filters: FilterParams;
  setFilters: Dispatch<SetStateAction<FilterParams>>;
}

export const Favorites = observer(
  ({ filters, setFilters }: IFavoritesProps) => {
    // Todo: move to character.store
    const [selectedCharacter, setSelectedCharacter] =
      useState<Character | null>(null);

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

    const filteredFavorites = charactersService.filterFavorites(
      favoritesStore.favorites,
      filters,
    );

    return (
      <div>
        {/* Todo: Utilize ANTD Layout along with the Outlet component */}
        <Header setFilters={setFilters} />
        <SubHeader filters={filters} setFilters={setFilters} />
        <div>
          {/* Todo: Avoid inline styles if not a MUST for some reason */}
          <h1 style={{ textAlign: "center", margin: "20px 0" }}>
            My Favorites
          </h1>
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
  },
);
