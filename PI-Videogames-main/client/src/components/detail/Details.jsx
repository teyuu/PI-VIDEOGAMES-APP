import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clear } from "../../actions/index";
import s from "./Details.Module.css";
import Loader from "../loader/Loader";

export default function Details(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    return () => {
      dispatch(clear());
    };
  }, []);

  const myGame = useSelector((state) => state.gameDetail);

  return (
    <div className={s.containerPadre}>
      {myGame.length > 0 ? (
        <div className={s.container1}>
          <div className={s.header}>
            <Link to='/home'>
            <button className={s.detailButton}>Back Home</button>
            </Link>
          </div>

          <div className={s.containerImgDescrep}>
            <div
              style={{
                backgroundImage: `url(${myGame[0].img})`,
              }}
              className={s.containerImg}
            ></div>
            <div className={s.containerDescrip}>
              <div className={s.containerTextDescrip}>
               <h1 className={s.tittle}>{myGame[0].name}</h1>
               <p>{myGame[0].platform ? myGame[0].platform : myGame[0].platforms} | {myGame[0].genres ? myGame[0].genres : myGame[0].Genres.map(e=> e.name).join(', ')} </p>
               <div className={s.descriptionText} ><p>{myGame[0].description}</p></div>
               <div className={s.ratingAndReleased}>
                <span><img style={{width:'25px'}} src="https://i.ibb.co/xSfqgcG/star.png" alt="" /> {myGame[0].rating}</span>
                <span> {myGame[0].released}</span>
               </div>
              </div>
            </div>
          </div>
        </div>
      ) : <Loader/>}
    </div>
  );
}
