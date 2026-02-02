import axios, { AxiosError } from 'axios';

export type Gender = 'Male' | 'Female' | 'Genderless' | 'unknown';

export type Status = 'Alive' | 'Dead' | 'unknown';

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  gender: Gender;
  image: string;
  location: { name: string; url: string };
}

export const GENDERS: Gender[] = ['Male', 'Female', 'Genderless', 'unknown'];
export const STATUSES: Status[] = ['Alive', 'Dead', 'unknown'];

export const genderOptions = GENDERS.map((gender) => ({
  value: gender,
  label: gender,
}));
export const statusOptions = STATUSES.map((status) => ({
  value: status,
  label: status,
}));

export interface PageInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface CharactersResponse {
  info: PageInfo;
  results: Character[];
}

export interface FilterParams {
  name?: string;
  species?: string;
  status?: Status;
  gender?: Gender;
}

export interface ServiceResult<T> {
  data: T | null;
  error: string | null;
}

export const getCharacters = async (
  page = 1,
  filters: FilterParams = {},
): Promise<ServiceResult<CharactersResponse>> => {
  try {
    const params: Record<string, unknown> = { page };

    if (filters.name) params.name = filters.name;
    if (filters.species) params.species = filters.species;
    if (filters.status) params.status = filters.status;
    if (filters.gender) params.gender = filters.gender;

    const response = await axios.get<CharactersResponse>(
      'https://rickandmortyapi.com/api/character',
      { params },
    );

    return { data: response.data, error: null };
  } catch (err) {
    const error =
      err instanceof AxiosError
        ? (err.response?.data?.error ?? 'API error')
        : 'Unknown error';

    return { data: null, error };
  }
};
