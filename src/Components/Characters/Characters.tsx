import {
  type ICharacter,
  type IFilterParams,
  type IPageInfo,
} from "../../modules/characters/characters.types";
import "./Characters.scss";
import { useEffect, useRef, useState } from "react";
import { Loader } from "../Loader/Loader";
import { CharacterGrid } from "../CharacterGrid/CharacterGrid";
import { Pagination } from "../Pagination/Pagination";
import { CharacterModal } from "../CharacterModal/CharacterModal";
import { getCharacters } from "../../modules/characters/characters.repo";
import { modalStore } from "../../modules/CharacterModal/modal.store";

export const Characters = ({ filters }: { filters?: IFilterParams }) => {
  // Todo: Use MOBX store as much as you can
  // Create filters store. create Filters component that accepts filterConfig param and renders filters according to that array

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [info, setInfo] = useState<IPageInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null,
  );
  const skipNextFetch = useRef(false);

  const handleCharacterClick = (character: ICharacter) => {
    setSelectedCharacter(character);
    modalStore.open();
  };

  const handleCloseModal = () => {
    modalStore.close();
    setSelectedCharacter(null);
  };

  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }
    const load = async () => {
      setLoading(true);
      setError(null);

      const result = await getCharacters(page, filters || {});

      setCharacters(result.data.results);
      setInfo(result.data.info);

      setLoading(false);
    };

    load();
  }, [page, filters]);

  if (loading) return <Loader />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <CharacterGrid
        characters={characters}
        onCharacterClick={handleCharacterClick}
      />

      <Pagination
        page={page}
        totalPages={info?.pages || 1}
        onChange={setPage}
      />

      <CharacterModal
        character={selectedCharacter}
        isOpen={modalStore.isOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
