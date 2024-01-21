import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "../services/movieApi";
import movieReducer from './movieSlice'

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    movieSearch: movieReducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
