import { useAppSelector } from "../hooks/hooks";
import { useSearchByMultipleIdsQuery } from "../services/movieApi";
import MovieCard from "../components/MovieCard/MovieCard";
import Loader from "../components/Loader/Loader";
import MyError from "../components/Error/MyError";

const FavouritesPage = () => {
  const favouriteIds = useAppSelector(
    (state) => state.movieSearch.favouriteMovies
  );
  const { isError, isLoading, data } =
    useSearchByMultipleIdsQuery(favouriteIds);

  return (
    <div className="py-5">
      {isLoading && <Loader />}
      {isError && <MyError />}
      <h3 className="text-center font-bold text-4xl mb-6">Favourite movies</h3>
      <div className="grid grid-cols-4 items-end gap-y-5">
        {data &&
          data.map((movie) => {
            return <MovieCard key={movie.imdbID} movieData={movie} />;
          })}
      </div>
    </div>
  );
};

export default FavouritesPage;
