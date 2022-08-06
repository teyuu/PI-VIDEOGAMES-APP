import React from 'react'
import s from './Paginado.Module.css'

export default function Paginado({gamesPerPage, allVideoGames, paginado}) {
  const pageNumber = [];
  
   for(let i=0; i<=Math.ceil(allVideoGames/gamesPerPage); i++){
    pageNumber.push(i+1)
   }

   pageNumber.pop()

   return(
      <nav className={s.containerPadre}>
        <ul className={s.nums}>
          {pageNumber && 
          pageNumber.map((number) =>{
            return(
            <li key={number}>
              <button className={s.button} onClick={() => paginado(number)}>{number}</button>
            </li>)
          })}
        </ul>
      </nav>
   )
}