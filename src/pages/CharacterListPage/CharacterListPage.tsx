import { Characters } from "../../Components/Characters/Characters";
// import { Header } from "../../Components/Header/Header";
import { SubHeader } from "../../Components/SubHeader/SubHeader";
import type { IFilterParams } from "../../modules/characters";

export interface ICharacterListProps {
  filters: IFilterParams;
  setFilters: React.Dispatch<React.SetStateAction<IFilterParams>>;
}

export function CharacterList({ filters, setFilters }: ICharacterListProps) {
  return (
    <div>
      {/* UNCOMENT FOR REMOVING LAYOUT */}
      {/* <Header setFilters={setFilters} /> */}
      <SubHeader filters={filters} setFilters={setFilters} />
      <Characters filters={filters} />
    </div>
  );
}
