import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.Module.css";

export default function LandingPage() {
  return (
    <div className={s.container}>
      <div className={s.textContainer}>
        <div className="bounce">
          <span className={s.letter}>W</span>
          <span className={s.letter}>E</span>
          <span className={s.letter}>L</span>
          <span className={s.letter}>C</span>
          <span className={s.letter}>O</span>
          <span className={s.letter}>M</span>
          <span className={s.letter}>E</span>
          <span className={s.invisibleLetter}>' '</span>
          <h1 className={s.h1}>TO MY VIDEOGAME APP</h1>
          <Link to='/home'>
          <button className={s.button}></button>
          </Link>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
}
