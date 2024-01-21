import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISearchedDataResponse, ISearchedMovie } from "../models/MovieType";

interface IInitialState {
  searchedData: ISearchedDataResponse[];
  movieById: ISearchedMovie[];
  favouriteMovies: string[];
}

interface IAddToFavouritesPayloadAction {
  id: string;
}

const initialState: IInitialState = {
  searchedData: [],
  movieById: [],
  favouriteMovies: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addToFavourites: (
      state,
      action: PayloadAction<IAddToFavouritesPayloadAction>
    ) => {
      state.favouriteMovies.push(action.payload.id);
    },
    removeFromFavourites: (
      state,
      action: PayloadAction<IAddToFavouritesPayloadAction>
    ) => {
      const findedId = state.favouriteMovies.find(
        (m) => m === action.payload.id
      );
      if (findedId) {
        const findedIndex = state.favouriteMovies.indexOf(findedId);
        state.favouriteMovies.splice(findedIndex, 1);
      }
    },
  },
});

export const { addToFavourites, removeFromFavourites } = movieSlice.actions;
export default movieSlice.reducer;
