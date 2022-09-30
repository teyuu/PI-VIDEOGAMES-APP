import React from 'react'
import {AiFillLinkedin, AiFillGithub} from 'react-icons/ai'
import {RiContactsLine} from 'react-icons/ri'

import s from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={s.container}>
        <div className={s.hijo}>
            <a href="https://www.linkedin.com/in/matias-tellini-12a705232/?locale=es_ES" target="_blank">
              <AiFillLinkedin/>  
            </a>
            <a href="https://github.com/teyuu" target="_blank">
            <AiFillGithub/>
            </a>
            <a href="https://matias-tellini.vercel.app/" target="_blank">
            <RiContactsLine/>
            </a>
            </div>
            <div>
                <p>Matias Tellini | Full Stack Developer</p>
            </div>
    </footer>
  )
}

export default Footer