import React from 'react'
import s from './Card.Module.css'

export default function Card({img, name , rating, genres}) {
  return (
    <div className={s.cardContainer}>
      <div  className={s.card}>
        <img src={img} className={s.cardImg}/>
        <div  className={s.cardInfo}>
          <p  className={s.textTitle}>{name}</p>
          <p  className={s.textBody}>{genres}</p>
        </div>
        <div  className={s.cardFooter}>
          <div className={s.ratybuton}>
          <span  className={s.textTitle}>Rating: {rating}</span>
          <button className={s.cardButton}><span>Mas info</span></button>
          </div>
        </div>
      </div>
    </div>
   
  )
}
