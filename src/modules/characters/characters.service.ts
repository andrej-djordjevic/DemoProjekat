import type { Character, FilterParams } from "../characters";

function filterByName(characters: Character[], name: string) {
  return characters.filter((character) =>
    character.name.toLowerCase().includes(name.toLowerCase()),
  );
}
function filterBySpecies(characters: Character[], species: string) {
  return characters.filter((character) =>
    character.species?.toLowerCase().includes(species.toLowerCase()),
  );
}
function filterByStatus(characters: Character[], status: string) {
  return characters.filter((character) =>
    character.status.toLowerCase().includes(status.toLowerCase()),
  );
}
function filterByGender(characters: Character[], gender: string) {
  return characters.filter((character) =>
    character.gender.toLowerCase().includes(gender.toLowerCase()),
  );
}

export const charactersService = {
  filterFavorites(characters: Character[], filters: FilterParams) {
    let result = characters;
    if (filters?.name) result = filterByName(result, filters.name);
    if (filters?.species) result = filterBySpecies(result, filters.species);
    if (filters?.status) result = filterByStatus(result, filters.status);
    if (filters?.gender) result = filterByGender(result, filters.gender);
    return result;
  },
};
