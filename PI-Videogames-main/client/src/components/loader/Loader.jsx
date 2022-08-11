import React from "react";
import s from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={s.containerLoader}>

    <div className={s.spinner}>
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
    </div>
  );
}
