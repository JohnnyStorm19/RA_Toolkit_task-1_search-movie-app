import { ISearchedMovie } from "../../models/MovieType"

export const getTitles = (searchedData: ISearchedMovie[]):string[] => {
    return searchedData.map(movie => movie.Title);
}