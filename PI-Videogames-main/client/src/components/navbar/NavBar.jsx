import React from 'react'
import s from './NavBar.Module.css'
import { Link} from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar'
import { getAllGames } from "../../actions";

export default function NavBar({setCurrentPage}) {


  return (
    <div className={s.container}>
      <div className={s.separate}>
      <div className={s.containerImg}><img  className={s.img} src="https://i.ibb.co/XSSGN8m/Pngtree-gray-toy-game-console-3775147.png" alt="" /></div>
        <div className={s.container1}>
            <Link className={s.link} to='/home' onClick={() => setCurrentPage(1)}>
            <span >HOME</span>
            </Link>
            <Link className={s.link} to='/createGame'>
            <span>CREATE</span>
            </Link>
            <Link className={s.link} to='/about'>
            <span>ABOUT</span>
            </Link>
        </div>
      </div>
        <div className={s.searchBar}><SearchBar setCurrentPage={setCurrentPage}/></div>  
    </div>
  )
}
