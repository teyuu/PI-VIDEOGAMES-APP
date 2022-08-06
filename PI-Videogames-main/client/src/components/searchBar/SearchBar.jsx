import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGameBySearch } from '../../actions';
import s from './SearchBar'

export default function SearchBar({setCurrentPage}) {
    
    const dispatch = useDispatch();
    const [name, setName ] = useState('')

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getGameBySearch(name))
        setName('')
        setCurrentPage(1)
    }
     
    return(
        <form>
            <input 
            className={s.search}
            type="text"
            placeholder='Search a game...'
            value={name}
            onChange={(e) => handleInputChange(e)}
             />
            <input type='submit' value="Search..." onClick={(e) => handleSubmit(e)}></input>
        </form>
    )

}