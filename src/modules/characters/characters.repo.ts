import axios, { type AxiosResponse } from "axios";
import type { ICharacter, IFilterParams, IPageInfo } from "./characters.types";

interface ICharactersResponse {
  info: IPageInfo;
  results: ICharacter[];
}

export const getCharacters = (
  page: number = 1,
  filters: IFilterParams = {},
): Promise<AxiosResponse<ICharactersResponse>> => {
  return axios.get<ICharactersResponse>(
    "https://rickandmortyapi.com/api/character",
    {
      params: {
        page,
        ...filters,
      },
    },
  );
};
