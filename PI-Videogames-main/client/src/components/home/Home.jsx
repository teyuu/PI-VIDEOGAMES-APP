import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  getAllGenres,
  getAllPlatforms,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import Paginado from "../paginado/Paginado";
import Loader from "../loader/Loader";
import Filters from "../filters/Filters";
import NavBar from "../navbar/NavBar";

import s from "./Home.Module.css";
import Footer from "../footer/Footer";
export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.games);
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
  }, [dispatch]);



  return (
    <div className={s.containerHome}>
       <NavBar setCurrentPage={setCurrentPage}/> 

  

    <div className={s.cardsAndFilters}>
   
        <Paginado
          gamesPerPage={gamesPerPage}
          allVideoGames={allGames.length}
          paginado={paginado}
        />
<div className={s.holi}>
  {currentGames.length > 0 ? <Filters setCurrentPage={setCurrentPage} setOrden={setOrden} ></Filters> : null}
   


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
</div>
       
    </div>
  <Footer/>
    </div>
  );
}
