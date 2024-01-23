import React, { useEffect, useState } from "react";
import { useBasicSearchQuery } from "../../services/movieApi";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { ISearchedMovie } from "../../models/MovieType";
import Loader from "../Loader/Loader";
import MyError from "../Error/MyError";

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const [dropdownTitles, setDropdownTitles] = useState<ISearchedMovie[]>([]);
  const [prevPage, setPrevPage] = useState(0);
  const [prevSearchValue, setPrevSearchValue] = useState("");
  const [skipFetching, setSkipFetching] = useState(false);

  const navigate = useNavigate();
  const debounced = useDebounce(searchValue.trim());

  const { isError, isLoading, data } = useBasicSearchQuery(
    { debounced, page },
    {
      skip: debounced.length < 2 || skipFetching
    }
  );

  useEffect(() => {
    if (prevSearchValue.length > searchValue.length) {
      setDropdownTitles([]);
      setPage(1);
      setPrevPage(0);
    }

    if (skipFetching) {
      setDropdownTitles([]);
      setPage(1);
      setPrevPage(0);
    }
    if (data && data.length > 0 && debounced.length > 1 && !skipFetching) {
      setDropdownTitles((prev) => [...prev, ...data]);
      setDropdown(debounced.length > 1 && data != undefined && data.length > 0);
    }

    if (searchValue.length === 0) {
      setDropdownTitles([]);
      setDropdown(false);
      setPage(1);
      setPrevPage(0);
      setPrevSearchValue("");
    }
  }, [searchValue, skipFetching, prevSearchValue, data, debounced]);

  useEffect(() => {
    setSkipFetching(page === prevPage);

  }, [page, prevPage]);

  useEffect(() => {
    setDropdownTitles([]);
    setPage(1);
    setPrevPage(0);
  }, [searchValue]);


  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setPrevSearchValue(searchValue);
    setSearchValue(e.currentTarget.value);
  };
  const onMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const scrollHandler = (e: React.SyntheticEvent<HTMLUListElement>) => {
    const container = e.currentTarget;
    if (
      container.clientHeight + Math.ceil(container.scrollTop) >=
      container.scrollHeight
    ) {
      setPrevPage(page);
      setPage(page + 1);
    }
  };

  return (
    <div className="md:w-1/3 mx-auto mt-10">
      <input
        type="search"
        name="search"
        id="search"
        value={searchValue}
        onChange={onChange}
        placeholder="Search movie..."
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      />
      {isLoading && <Loader />}
      {isError && <MyError />}
      {dropdown && (
        <div>
          <ul
            className="shadow-md p-3 h-[250px] overflow-y-scroll"
            onScroll={(e) => scrollHandler(e)}
          >
            {dropdownTitles?.map((movie) => {
              return (
                <li
                  key={movie.imdbID}
                  onClick={() => onMovieClick(movie.imdbID)}
                  className="px-3 py-2 hover:bg-slate-500 hover:text-white cursor-default transition-colors"
                >
                  {movie.Title}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
