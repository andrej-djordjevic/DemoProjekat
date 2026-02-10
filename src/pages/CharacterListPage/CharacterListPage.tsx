import { Characters } from "../../Components/Characters/Characters";
import { Header } from "../../Components/Header/Header";
import { SubHeader } from "../../Components/SubHeader/SubHeader";
import type { FilterParams } from "../../modules/characters";

export interface CharacterListProps {
  filters: FilterParams;
  setFilters: React.Dispatch<React.SetStateAction<FilterParams>>;
}

export default function CharacterList({
  filters,
  setFilters,
}: CharacterListProps) {
  return (
    <div>
      <Header setFilters={setFilters} />
      <SubHeader filters={filters} setFilters={setFilters} />
      <Characters filters={filters} />
    </div>
  );
}
