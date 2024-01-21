import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { removeFromFavourites } from "../../store/movieSlice";
import { ISearchedMovie } from "../../models/MovieType";

interface IMovieCardProps {
    movieData: ISearchedMovie;
}

const MovieCard = ({ movieData }: IMovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };
  const onBtnClick = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    id: { id: string }
  ) => {
    e.stopPropagation();
    dispatch(removeFromFavourites(id));
  };
  return (
    <div
      key={movieData.imdbID}
      className="relative mx-auto flex flex-col justify-center cursor-pointer"
      onClick={() => onMovieClick(movieData.imdbID)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`${
          isHovered ? "block" : "hidden"
        } absolute top-0 left-0 bottom-0 right-0 bg-slate-100 opacity-20`}
      ></div>
      <button
        className={`absolute ${
          isHovered ? "block" : "hidden"
        } -top-5 right-1/4 text-sm py-3 px-2 text-white bg-rose-600 rounded-xl`}
        onClick={(e) => onBtnClick(e, { id: movieData.imdbID })}
      >
        Remove from favourites
      </button>
      <img src={movieData.Poster} alt="" />
      <h2 className="text-center px-3 font-semibold">
        {movieData.Title}, {movieData.Year}
      </h2>
    </div>
  );
};

export default MovieCard;
