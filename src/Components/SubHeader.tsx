import './CSS/subHeader.scss';
import { useEffect, useState } from 'react';
import type { FilterParams } from '../services/Characters';
import type React from 'react';

interface Props {
  filters: FilterParams;
  setFilters: (f: FilterParams) => void;
}

export const SubHeader = ({ filters, setFilters }: Props) => {
  const [local, setLocal] = useState<FilterParams>({
    name: '',
    species: '',
    status: '',
    gender: '',
  });

  useEffect(() => {
    setLocal((l) => ({ ...l, ...filters }));
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (local.species !== filters.species) {
        setFilters({
          name: (local.name || '').trim(),
          species: (local.species || '').trim(),
          status: (local.status || '').trim(),
          gender: (local.gender || '').trim(),
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [local.species, filters, setFilters]);

  const onChange =
    (key: keyof FilterParams) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setLocal((prev) => ({ ...prev, [key]: value }));
    };

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setFilters({
      name: (local.name || '').trim(),
      species: (local.species || '').trim(),
      status: (local.status || '').trim(),
      gender: (local.gender || '').trim(),
    });
  };

  return (
    <form className="subHeader" onSubmit={submit}>
      <input
        className="filterInput"
        placeholder="NAME"
        value={local.name || ''}
        onChange={onChange('name')}
      />
      <input
        className="filterInput"
        placeholder="SPECIES"
        value={local.species || ''}
        onChange={onChange('species')}
      />
      <select
        className="filterInput"
        value={local.status || ''}
        onChange={onChange('status')}
      >
        <option value="">STATUS</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <select
        className="filterInput"
        value={local.gender || ''}
        onChange={onChange('gender')}
      >
        <option value="">GENDER</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="female">Female</option>
        <option value="unknown">Unknown</option>
      </select>
      <button className="searchBtn" type="submit">
        SEARCH
      </button>
    </form>
  );
};
