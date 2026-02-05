import {
  getCharacters,
  type Character,
  type FilterParams,
  type PageInfo,
} from '../services/Characters';
import '../CSS/characters.scss';
import { useEffect, useState, useRef } from 'react';
import { Loader } from './Loader/Loader';
import { CharacterGrid } from './CharacterGrid';
import { CharacterModal } from './CharacterModal/CharacterModal';
import { Pagination } from './Pagination';

export const Characters = ({ filters }: { filters?: FilterParams }) => {
  // Todo: Use MOBX store as much as you can
  // Create filters store. create Filters component that accepts filterConfig param and renders filters according to that array

  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<PageInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  // Todo: create modal store and use it alongside custom variant of ANTD modal component to render modals effortlessly 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const skipNextFetch = useRef(false);

  useEffect(() => {
    if (page !== 1) {
      skipNextFetch.current = true;
      setPage(1);
    }
  }, [filters]);

  // Todo: Use effect generally goes to the bottom of script part
  // unless u see it makes much more sense to keep it coupled along some other code
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

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

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
        totalPages={info?.pages}
        hasPrev={!!info?.prev}
        hasNext={!!info?.next}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => (info ? Math.min(info.pages, p + 1) : p))}
      />

      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
