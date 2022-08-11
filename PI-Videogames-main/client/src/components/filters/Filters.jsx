import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  filterByGenre,
  filterByRating,
  filterByAbc,
  filterCreated,
} from "../../actions/index";
import s from "./Filters.Module.css";

export default function Filters({ setCurrentPage, setOrden }) {
  const dispatch = useDispatch();
  const myGenres = useSelector((state) => state.allMyGenres);

  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(getAllGames());
  //   setCurrentPage(1);
  // }

  function handleFilterByGenre(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterByRating(e) {
    e.preventDefault();
    e.target.value === "all"
      ? dispatch(getAllGames) && setOrden(`Rating ${e.target.value}`)
      : dispatch(filterByRating(e.target.value));
    setOrden(`Rating ${e.target.value}`);
    setCurrentPage(1);
  }

  function handleFilterByAbc(e) {
    e.preventDefault();
    e.target.value === "all"
      ? dispatch(filterByAbc) && setOrden(`ABC ${e.target.value}`)
      : dispatch(filterByAbc(e.target.value));
    setOrden(`ABC ${e.target.value}`);
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className={s.filters}>
      <div className={s.filterContainer}>
        <h5 className={s.underline}>Filters</h5>
        <div className={s.aligns}>

        <p>Genres:</p>
        <select className={s.options} onChange={(e) => handleFilterByGenre(e)}>
          <option  value="all">All</option>
          {myGenres?.map((e) => {
            return (
              <option key={e.id} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>

        <p>Storage:</p>
        <select className={s.options} onChange={(e) => handleFilterCreated(e)}>
          <option value="all">All</option>
          <option value="lb">Library</option>
          <option value="db">Created in DB</option>
        </select>
      </div>
        </div>

      <div className={s.sortingContainer}>
        
        <h5 className={s.underline}>Sorting</h5>
        <div className={s.aligns}>
          <p>Rating:</p>
          <select className={s.options} onChange={(e) => handleFilterByRating(e)}>
            <option value="all">All</option>
            <option value="asc">Rating Asc</option>
            <option value="desc">Rating Desc</option>
          </select>
        </div>
        <p>Alphabetical Order:</p>
        <select className={s.options} onChange={(e) => handleFilterByAbc(e)}>
          <option value="all">All</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>
  );
}
