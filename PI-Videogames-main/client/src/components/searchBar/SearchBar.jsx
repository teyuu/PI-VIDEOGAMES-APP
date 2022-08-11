import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGameBySearch, getAllGames } from "../../actions";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  inp: {
    backgroundColor: "white",
    width: '22rem',
    height: '3rem',
    overflow: 'hidden',
  },
});

export default function SearchBar({ setCurrentPage }) {

  const history = useHistory()
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  
  useEffect(()=>{
    dispatch(getAllGames)
  },[])

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(getGameBySearch(e.target.value));
    setCurrentPage(1);
    history.push('/home')
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   dispatch(getGameBySearch(name));
  //   setName("");
  //   setCurrentPage(1);
  // }

  return (
    <form>
      <TextField
        className={classes.inp}
        id="outlined-basic"
        label="Search a game..."
        variant="standard"
        onChange={(e) => handleInputChange(e)}
      />
      {/* <Button variant="contained" size="small" onClick={(e) => handleSubmit(e)}>
        Search
      </Button> */}
    </form>
  );
}
