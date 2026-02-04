import { Characters } from '../Components/Characters';
import { Header } from '../Components/Header/Header';
import { SubHeader } from '../Components/SubHeader/SubHeader';
import type { FilterParams } from '../services/Characters';

interface Props {
  filters: FilterParams;
  setFilters: React.Dispatch<React.SetStateAction<FilterParams>>;
}

export default function CharacterList({ filters, setFilters }: Props) {
  return (
    <div>
      <Header setFilters={setFilters} />
      <SubHeader filters={filters} setFilters={setFilters} />
      <Characters filters={filters} />
    </div>
  );
}
