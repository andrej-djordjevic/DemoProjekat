import { Header } from '../Components/Header';
import { SubHeader } from '../Components/SubHeader';
import type { FilterParams } from '../services/Characters';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  filters: FilterParams;
  setFilters: Dispatch<SetStateAction<FilterParams>>;
};

export default function Favorites({ filters, setFilters }: Props) {
  return (
    <div>
      <Header setFilters={setFilters} />
      <SubHeader filters={filters} setFilters={setFilters} />
    </div>
  );
}
