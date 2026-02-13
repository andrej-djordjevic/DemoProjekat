import {
  GENDERS,
  STATUSES,
  type GenderType,
  type StatusType,
} from "./characters/characters.types";

// Todo: reorganize stuff from here into characters module

export interface ICharacter {
  id: number;
  name: string;
  status: StatusType;
  species: string;
  gender: GenderType;
  image: string;
  location: { name: string; url: string };
}

export const genderOptions = GENDERS.map((gender) => ({
  value: gender,
  label: gender,
}));
export const statusOptions = STATUSES.map((status) => ({
  value: status,
  label: status,
}));

export interface IPageInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface IFilterParams {
  name?: string;
  species?: string;
  status?: StatusType;
  gender?: GenderType;
}

export interface IServiceResult<T> {
  data: T | null;
  error: string | null;
}
