import type { ICharacter, IFilterParams } from "../characters";

function filterByName(characters: ICharacter[], name: string) {
  return characters.filter((character) =>
    character.name.toLowerCase().includes(name.toLowerCase()),
  );
}
function filterBySpecies(characters: ICharacter[], species: string) {
  return characters.filter((character) =>
    character.species?.toLowerCase().includes(species.toLowerCase()),
  );
}
function filterByStatus(characters: ICharacter[], status: string) {
  return characters.filter((character) =>
    character.status.toLowerCase().includes(status.toLowerCase()),
  );
}
function filterByGender(characters: ICharacter[], gender: string) {
  return characters.filter((character) =>
    character.gender.toLowerCase().includes(gender.toLowerCase()),
  );
}

export const charactersService = {
  filterFavorites(characters: ICharacter[], filters: IFilterParams) {
    let result = characters;
    if (filters?.name) result = filterByName(result, filters.name);
    if (filters?.species) result = filterBySpecies(result, filters.species);
    if (filters?.status) result = filterByStatus(result, filters.status);
    if (filters?.gender) result = filterByGender(result, filters.gender);
    return result;
  },
};
