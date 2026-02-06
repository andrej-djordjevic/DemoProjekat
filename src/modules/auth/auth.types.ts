export interface IUserPayload {
  username: string;
  password: string;
  dateOfBirth: string;
}

export enum HumanGenderEnum {
  MALE = "male",
  FEMALE = "female",
}

export enum AlienGenderEnum {
  SUCCUBUS = "succubus",
  DARK_LORD = "dark_lord",
}

export type SpeciesType = "alien" | "human";
