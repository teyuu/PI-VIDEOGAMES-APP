import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  postGame,
  getAllGenres,
  getVideogames,
  getAllPlatforms,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./formCreate.Module.css";

export default function () {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.allMyGenres);
  const platforms = useSelector((state) => state.platforms);
  const [error, setError] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    rating: "",
    released: "",
    img: "",
    platforms: [],
    genres: [],
  });

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllPlatforms());
  }, []);

  function validate(input) {
    let error = {};

    if (!input.name) {
      error.name = "Name is required";
    } else if (input.name.length > 50) {
      error.name = "Name is too long";
    }

    if (!input.description) {
      error.description = "Description is required ";
    } else if (input.description.length > 1500) {
      error.description = "Description is too long. (Max = 1500 characters)";
    }

    if (!input.rating) {
      error.rating = "Rating is required";
    } else if (input.rating > 5 || input.rating < 0) {
      error.rating = "Rating must range between 0 to 5";
    }

    if (!input.released) {
      error.released = "Date of release is required";
    } else if (input.released.length < 10) {
      error.released = "Date of release is to long";
    }
    if (!input.img) {
      error.img = "Image URL is required";
    }

    if (!input.genres[0]) {
      error.genres = "Minimun one Genre is required ";
    }

    if (!input.platforms[0]) {
      error.platforms = "Minimun one Platform is required";
    }

    return error;
  }

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    console.log(input);
  }

  function handleSelectGenres(e) {
    // let filt = input.genres.filter(e=> e === e.target.name)
    // console.log(filt)

    if (!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
      setError(
        validate({
          ...input,
          genres: [...input.genres, e.target.value],
        })
      );
    } else {
      setInput({
        ...input,
      });
    }
  }

  function handleSelectPlatform(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
    setError(
      validate({
        ...input,
        platforms: [...input.platforms, e.target.value],
      })
    );
  }

  function handleDeletePlatforms(el) {
    setInput({
      ...input,
      platforms: input.platforms.filter((param) => param !== el),
    });
  }

  function handleDeleteGenres(el) {
    setInput({
      ...input,
      genres: input.genres.filter((param) => param !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(e.data);

    let crear = {
      name: input.name,
      description: input.description,
      rating: input.rating,
      released: input.released,
      img: input.img,
      platforms: input.platforms.join(", "),
      genres: input.genres.join(", "),
    };

    dispatch(postGame(crear));

    setInput({
      name: "",
      description: "",
      rating: "",
      released: "",
      img: "",
      platforms: [],
      genres: [],
    });

    alert("VideoGame Created");
    history.push("/home");
  }

  return (
    <div className={s.containerPadre}>
      <div className={s.subContainer}>

        <div className={s.firstContainerForm}>
      
        <Link to="/home">
          <div className={s.buttonContainer}><button className={s.buttonForm}>BACK HOME</button></div>
          
        </Link>

        <div className={s.containerForm}>

        <h1 className={s.titulo}>Crea tu videojuego</h1>
        <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
          <div>
            <p>Name:</p>
            <input
            className={s.thisInput}
              type="text"
              value={input.name}
              name="name"
              onChange={handleOnChange}
            />
            {error.name && <span className={s.red}>{error.name}</span>}
          </div>


          <div>
            <p>Released:</p>
            <input
             className={s.thisInput}
              type="date"
              value={input.released}
              name="released"
              onChange={handleOnChange}
            />
            {error.released && <span className={s.red}>{error.released}</span>}
          </div>

          <div>
            <p>ImageUrl:</p>
            <input
             className={s.thisInput}
              type="text"
              value={input.img}
              name="img"
              onChange={handleOnChange}
            />
            {error.img && <span className={s.red}>{error.img}</span>}
          </div>

          <div>
            <p>Rating:</p>
            <input
             className={s.thisInput}
              type="number"
              value={input.rating}
              name="rating"
              onChange={handleOnChange}
            />
            {error.rating && <span className={s.red}>{error.rating}</span>}
          </div>
          <div>
            <p>Genres</p>
            <select  className={s.thisInput} onChange={(e) => handleSelectGenres(e)}>
              <option value="all">All</option>
              {genres?.map((e) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            {error.genres && <span className={s.red}>{error.genres}</span>}
          </div>
          <div className={s.selected}>
            {input.genres?.map((e) => {
              return (
                <>
                  <div>{e}</div>
                  <button onClick={() => handleDeleteGenres(e)}>X</button>
                </>
              );
            })}{" "}
          </div>
          <div>
            <p>Platforms</p>
            <select  className={s.thisInput} onChange={(e) => handleSelectPlatform(e)}>
              <option value="all">All</option>
              {platforms?.map((e) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            {error.platforms && (
              <span className={s.red}>{error.platforms}</span>
            )}
          </div>
          <div className={s.selected}>
            {input.platforms?.map((e) => {
              return (
                <>
                  <div>{e}</div>
                  <button onClick={() => handleDeletePlatforms(e)}>X</button>
                </>
              );
            })}
          </div>
          <div>
            <p>Description:</p>
            <textarea
              className={s.textArea}
              type="text"
              value={input.description}
              name="description"
              onChange={handleOnChange}
            />
            {error.description && (
              <span className={s.red}>{error.description}</span>
            )}
          </div>
          {Object.keys(error).length ? (
            <div>
              <input type="submit" disabled name="Send" />
            </div>
          ) : (
            <div>
              <input type="submit" name="Send" />
            </div>
          )}
        </form>
        </div>
        </div>
      </div>
        <div className={s.subContainer2}></div>
    </div>
  );
}
