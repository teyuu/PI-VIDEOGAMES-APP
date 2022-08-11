import React from 'react'
import s from './Card.Module.css'

export default function Card({img, name , rating, genres}) {
  return (
    <div className={s.cardContainer}>
      <div  className={s.card}>
        <img src={img} alt='img' className={s.cardImg}/>
        <div  className={s.cardInfo}>
          <p  className={s.textTitle}>{name}</p>
          <p  className={s.textBody}>{genres}</p>
        </div>
        <div  className={s.cardFooter}>
          <div className={s.ratybuton}>
            <div>
            <img style={{width:'25px'}} src="https://i.ibb.co/xSfqgcG/star.png" alt="" />  
          <span  className={s.textTitle}>{rating}</span>

            </div>
          <button className={s.cardButton}><span>Read More</span></button>
          </div>
        </div>
      </div>
    </div>
   
  )
}
