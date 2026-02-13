import {
  type ICharacter,
  type IFilterParams,
  type IPageInfo,
} from "../../modules/characters";
import "./Characters.scss";
import { useEffect, useRef, useState } from "react";
import { Loader } from "../Loader/Loader";
import { CharacterGrid } from "../CharacterGrid/CharacterGrid";
import { Pagination } from "../Pagination/Pagination";
import { CharacterModal } from "../CharacterModal/CharacterModal";
import { getCharacters } from "../../modules/characters/characters.repo";

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
  // Todo: create modal store and use it alongside custom variant of ANTD modal component to render modals effortlessly
  const [isModalOpen, setIsModalOpen] = useState(false);
  const skipNextFetch = useRef(false);

  const handleCharacterClick = (character: ICharacter) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

      if (result.error) {
        setCharacters([]);
        setInfo(null);
        setError(result.error);
      } else if (result.data) {
        setCharacters(result.data.results);
        setInfo(result.data.info);
      }

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
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
