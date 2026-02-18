// Todo: move all the logic into the characters module , look for examples inside e-takse-front project on factoryww github

import { makeAutoObservable } from "mobx";
import type { ICharacter } from "./characters.types";

class CharactersStore {
  selectedCharacter: ICharacter | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedCharacter(character: ICharacter | null) {
    this.selectedCharacter = character;
  }
}

export const charactersStore = new CharactersStore();
