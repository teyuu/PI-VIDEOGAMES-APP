import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  getAllGenres,
  filterByGenre,
  filterByRating,
  filterByAbc,
  filterCreated,
  getAllPlatforms,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import Paginado from "../paginado/Paginado";
import SearchBar from "../searchBar/SearchBar";
import Loader from "../loader/Loader";

import s from "./Home.Module.css";
export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.games);
  const myGenres = useSelector((state) => state.allMyGenres);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage; //15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //0
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllGenres());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  // useEffect(()=>{
  //     dispatch(getAllGenres())
  // }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllGames());
    setCurrentPage(1)
  }

  function handleFilterByGenre(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1)
  }

  function handleFilterByRating(e) {
    e.preventDefault();
    e.target.value === "all"
      ? dispatch(getAllGames) && setOrden(`Rating ${e.target.value}`)
      : dispatch(filterByRating(e.target.value));
    setOrden(`Rating ${e.target.value}`);
    setCurrentPage(1)
  }

  function handleFilterByAbc(e) {
    e.preventDefault();
    e.target.value === "all"
      ? dispatch(filterByAbc) && setOrden(`ABC ${e.target.value}`)
      : dispatch(filterByAbc(e.target.value));
    setOrden(`ABC ${e.target.value}`);
    setCurrentPage(1)
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1)
  }

  return (

    <div className={s.containerHome}>
      <div className={s.container2}>
        <div className={s.container3}>
            <Link to='/'>
          <h1 className={s.logo}>PI VIDEOGAMES</h1>
            </Link>
          <div>
            <Link to="/createGame">
              <button className={s.buttonCrear}>Create a VideoGame</button>
            </Link>
          </div>
          <div className={s.search}>
            <SearchBar setCurrentPage={setCurrentPage}></SearchBar>
          </div>
        </div>

        {/* FILTROS */}
    <div className={s.filters}>
    <button
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Reset
            </button>
        <label>
          Genres:
          <select onChange={(e) => handleFilterByGenre(e)}>
            <option value="all">All</option>
            {myGenres?.map((e) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Origin:
          <select onChange={(e) => handleFilterCreated(e)}>
            <option value="all">All</option>
            <option value="lb">Library</option>
            <option value="db">Created in DB</option>
          </select>
        </label>

        <label>
          Rating:
          <select onChange={(e) => handleFilterByRating(e)}>
            <option value="all">All</option>
            <option value="asc">Rating Asc</option>
            <option value="desc">Rating Desc</option>
          </select>
        </label>

        <label>
          Alphabetical Order:
          <select onChange={(e) => handleFilterByAbc(e)}>
            <option value="all">All</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </label>
      </div>
    </div>

      <div className={s.containerPaginado}>
        <Paginado
          gamesPerPage={gamesPerPage}
          allVideoGames={allGames.length}
          paginado={paginado}
        />
      </div>

      {/* maps */}
      <div className={s.containerCards}>
        {currentGames.length>0 ?
          currentGames.map((e) => {
            return (
              <Link key={e.id} to={`/videogame/${e.id}`}>
                <Card
                  name={e.name}
                  img={e.img}
                  rating={e.rating}
                  key={e.id}
                  genres={e.genres}
                />
              </Link>
            );
          }): <Loader/>} 
      </div>
      <div  className={s.containerPaginado}>
        <Paginado
          gamesPerPage={gamesPerPage}
          allVideoGames={allGames.length}
          paginado={paginado}
        />
      </div>

    </div>
  );
}
