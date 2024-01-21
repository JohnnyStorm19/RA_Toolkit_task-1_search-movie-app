import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IMovieSearchedById,
  ISearchedDataResponse,
  ISearchedMovie,
} from "../models/MovieType";

interface IBasicSearchQuery {
    debounced: string;
    page: number;
}

const manualFetching = async (id: string) => {
  const response = await fetch(
    `https://www.omdbapi.com?apikey=9713c5e7&i=${id}`
  );
  return await response.json();
};

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.omdbapi.com",
  }),
  endpoints: (builder) => ({
    basicSearch: builder.query<ISearchedMovie[], IBasicSearchQuery>({
      query: ({debounced, page}) => `?apikey=9713c5e7&s=${debounced}&page=${page}`,
      transformResponse: (response: ISearchedDataResponse) => response.Search,
    }),
    searchById: builder.query<IMovieSearchedById, string>({
      query: (id) => `?apikey=9713c5e7&i=${id}`,
    }),
    searchByMultipleIds: builder.query<IMovieSearchedById[], string[]>({
      queryFn: async (ids: string[]) => {
        try {
          const promises = ids.map((id) => manualFetching(id));
          const results = await Promise.all(promises);
          return { data: results }; 
        } catch (error) {
          throw new Error ('Something went wrong');
        }
      },
    }),
  }),
});

export const {
  useBasicSearchQuery,
  useSearchByIdQuery,
  useSearchByMultipleIdsQuery,
} = movieApi;
