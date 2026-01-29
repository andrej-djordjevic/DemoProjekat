import {
  getCharacters,
  type Character,
  type FilterParams,
  type PageInfo,
} from '../services/Characters';
import './CSS/characters.scss';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';

export const Characters = ({ filters }: { filters?: FilterParams }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<PageInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
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
      <div className="charactersGrid">
        {characters.map((character) => (
          <div key={character.id}>
            <img
              className="characterImage"
              src={character.image}
              alt={character.name}
            />
            <p>{character.name}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={!info?.prev}
        >
          Prev
        </button>

        <span>
          Page {page} {info ? `of ${info.pages}` : ''}
        </span>

        <button
          onClick={() =>
            setPage((p) => (info ? Math.min(info.pages, p + 1) : p))
          }
          disabled={!info?.next}
        >
          Next
        </button>
      </div>
    </div>
  );
};
