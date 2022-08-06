import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, clear } from '../../actions/index';
import s from './Details.Module.css'
import Loader from '../loader/Loader';



export default function Details(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
        return () => {dispatch(clear())}
    },[dispatch])

    const myGame = useSelector((state) => state.gameDetail)
  return (
        <div className={s.containerPadre}>
            {myGame.length > 0 ? 
            <div className={s.container1}>
                <Link to='/home'>
                <div><button>Volver</button></div>
                </Link>
                <div className={s.container2}>
                <h1>{myGame[0].name}</h1>
                <img style={{width:'60%'}} src={myGame[0].img}></img>
                </div>
                <h4>Genres: {myGame[0].genres ? myGame[0].genres : myGame[0].Genres.map(e=> e.name).join(', ')}</h4>
                <h4>Realeased: {myGame[0].released}</h4>
                <h4>Rating: {myGame[0].rating}</h4>
                <h4>Platforms: {myGame[0].platform ? myGame[0].platform : myGame[0].platforms}</h4>
                <h4>Description:</h4>
                <span>{myGame[0].description}</span>
            </div> 
            : 
            <Loader/>
            } 
        </div>

  )
}
