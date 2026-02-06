import {
  AlienGenderEnum,
  HumanGenderEnum,
  type SpeciesType,
} from "./auth.types";

export const HUMAN_GENDER_OPTIONS = [
  { value: HumanGenderEnum.MALE, label: "Musko" },
  { value: HumanGenderEnum.FEMALE, label: "Zensko" },
];

export const ALIEN_GENDER_OPTIONS = [
  { value: AlienGenderEnum.SUCCUBUS, label: "Succubus" },
  { value: AlienGenderEnum.DARK_LORD, label: "Dark lord" },
];

export const genderOptionsBySpieces = (species: SpeciesType) => {
  if (species === "human") return HUMAN_GENDER_OPTIONS;
  if (species === "alien") return ALIEN_GENDER_OPTIONS;
};
