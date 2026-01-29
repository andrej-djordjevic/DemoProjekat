import { useState } from 'react';
import { Characters } from '../Components/Characters';
import { Header } from '../Components/Header';
import { SubHeader } from '../Components/SubHeader';
import type { FilterParams } from '../services/Characters';

export default function CharacterList() {
  const [filters, setFilters] = useState<FilterParams>({});

  return (
    <div>
      <Header />
      <SubHeader filters={filters} setFilters={setFilters} />
      <Characters filters={filters} />
    </div>
  );
}
