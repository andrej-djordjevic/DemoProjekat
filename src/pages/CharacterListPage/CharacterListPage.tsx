import { Characters } from "../../Components/Characters/Characters";
import { Header } from "../../Components/Header/Header";
import { SubHeader } from "../../Components/SubHeader/SubHeader";
import type { FilterParams } from "../../modules/characters";

export interface ICharacterListProps {
  filters: FilterParams;
  setFilters: React.Dispatch<React.SetStateAction<FilterParams>>;
}

export function CharacterList({
  filters,
  setFilters,
}: ICharacterListProps) {
  return (
    <div>
      <Header setFilters={setFilters} />
      <SubHeader filters={filters} setFilters={setFilters} />
      <Characters filters={filters} />
    </div>
  );
}
