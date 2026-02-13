import type { Dispatch, SetStateAction } from "react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import type { ICharacter, IFilterParams } from "../../modules/characters";
import { favoritesStore } from "../../modules/auth/favorites.store";
import { SubHeader } from "../../Components/SubHeader/SubHeader";
// import { Header } from "../../Components/Header/Header";
import { CharacterGrid } from "../../Components/CharacterGrid/CharacterGrid";
import { CharacterModal } from "../../Components/CharacterModal/CharacterModal";
import { charactersService } from "../../modules/characters/characters.service";
import "./FavoritesPage.scss";

export interface IFavoritesProps {
  filters: IFilterParams;
  setFilters: Dispatch<SetStateAction<IFilterParams>>;
}

export const Favorites = observer(
  ({ filters, setFilters }: IFavoritesProps) => {
    // Todo: move to character.store
    const [selectedCharacter, setSelectedCharacter] =
      useState<ICharacter | null>(null);

    // Todo: make modal module with store and types
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCharacterClick = (character: ICharacter) => {
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
        {/* UNCOMENT FOR REMOVING LAYOUT */}
        {/* <Header setFilters={setFilters} /> */}
        <SubHeader filters={filters} setFilters={setFilters} />
        <div>
          <h1 className="favorites-title">My Favorites</h1>
          {favoritesStore.favorites.length === 0 ? (
            <p className="favorites-title">
              No favorites yet. Click the heart icon on characters to add them
              here!
            </p>
          ) : filteredFavorites.length === 0 ? (
            <p className="favorites-title">
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
