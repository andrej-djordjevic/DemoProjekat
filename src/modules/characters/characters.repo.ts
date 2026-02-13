import axios, { AxiosError } from "axios";
import type {
  ICharacter,
  IFilterParams,
  IPageInfo,
  IServiceResult,
} from "../characters";

interface ICharactersResponse {
  info: IPageInfo;
  results: ICharacter[];
}

const characterCache = new Map<string, IServiceResult<ICharactersResponse>>();

function makeCacheKey(page: number, filters: IFilterParams) {
  return JSON.stringify({ page, ...filters });
}

export const getCharacters = async (
  page = 1,
  filters: IFilterParams = {},
): Promise<IServiceResult<ICharactersResponse>> => {
  const cacheKey = makeCacheKey(page, filters);
  if (characterCache.has(cacheKey)) {
    return characterCache.get(cacheKey)!;
  }
  try {
    const params = {
      page,
      name: filters.name || undefined,
      species: filters.species || undefined,
      status: filters.status || undefined,
      gender: filters.gender || undefined,
    };

    const response = await axios.get<ICharactersResponse>(
      "https://rickandmortyapi.com/api/character",
      { params },
    );

    const result = { data: response.data, error: null };
    characterCache.set(cacheKey, result);
    return result;
    // Todo:  Errors are usually handled inside an axios error interceptor, we always create an axios instance and
    // configure it with the API base url, and interceptors for error handling and header management (authorization bearer token i.e)
  } catch (err) {
    const error =
      err instanceof AxiosError
        ? (err.response?.data?.error ??
          err.message + " - " + "API request failed")
        : "Unknown error";
    const result = { data: null, error };
    characterCache.set(cacheKey, result);
    return result;
  }
};
