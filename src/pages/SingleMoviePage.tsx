import { useParams } from "react-router-dom";
import { useSearchByIdQuery } from "../services/movieApi";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addToFavourites, removeFromFavourites } from "../store/movieSlice";
import Loader from "../components/Loader/Loader";
import MyError from "../components/Error/MyError";
import Button from "../components/UI/Button";

const inFavorites = (array: string[], id: string) => {
  return array.find((item) => item === id) === undefined ? false : true;
};

const SingleMoviePage = () => {
  const favouriteMovies = useAppSelector(
    (state) => state.movieSearch.favouriteMovies
  );
  const { id } = useParams();
  const [isAddedToFavourites, setIsAddedToFavourites] = useState(
    inFavorites(favouriteMovies, id as string)
  );
  const dispatch = useAppDispatch();
  const { isError, isLoading, data } = useSearchByIdQuery(id as string, {
    skip: id?.length === 0,
  });

  const onFavouritesClick = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setIsAddedToFavourites(!isAddedToFavourites);
    if (e.currentTarget.name === "add") {
      dispatch(addToFavourites({ id }));
    }
    if (e.currentTarget.name === "remove") {
      dispatch(removeFromFavourites({ id }));
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {isError && <MyError />}
      {data && (
        <div className="text-gray-900 text-5xl mb-2 text-center py-8 px-5">
          <header className="flex flex-col gap-2">
            <h2 className="font-bold">{data?.Title}</h2>
            <h2 className="text-3xl">{data?.Year}</h2>
            <h2 className="text-3xl mb-8">Directed by: {data?.Director}</h2>
          </header>
          <div className="flex justify-center items-center gap-6 mb-8">
            <div>
              <img
                src={data?.Poster}
                alt={`Poster of ${data?.Title}`}
                className="mx-auto"
              />
            </div>
            <div className="text-left font-normal">
              <h3 className="text-xl">
                <span className="font-bold">IMDB rating: </span>
                {data?.imdbRating} ({data?.imdbVotes} votes)
              </h3>
              <h3 className="text-xl">
                <span className="font-bold">Runtime: </span>
                {data?.Runtime}
              </h3>
              <h3 className="text-xl">
                <span className="font-bold">Genre: </span>
                {data?.Genre}
              </h3>
              <h3 className="text-xl">
                <span className="font-bold">Actors: </span>
                {data?.Actors}
              </h3>
              {isAddedToFavourites && (
                <Button
                  buttonName="remove"
                  onClickHandler={onFavouritesClick}
                  id={data.imdbID}
                >
                  Remove from favourites
                </Button>
              )}
              {!isAddedToFavourites && (
                <Button
                  buttonName="add"
                  onClickHandler={onFavouritesClick}
                  id={data.imdbID}
                >
                  Add to favourites
                </Button>
              )}
            </div>
          </div>
          <h2 className="text-2xl font-normal">{data?.Plot}</h2>
        </div>
      )}
    </>
  );
};

export default SingleMoviePage;
