// Destructuring in the { brackets }
import React, { useState, useEffect } from "react";
// Default import allows for renaming of export variable
import axios from "./axios";
import requests from "./requests";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

/* This is going to be a component for each row of movies */
function Row({ title, fetchUrl, isLargeRow }) {
  /* State, how you write react variables */
  // Empty array of movies
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // Snippet of code which runs on a specific condition/variable
  // When row loads, make a request to TMDb
  useEffect(() => {
    // Async task with internal function
    async function fetchData() {
      // Whenever you use an outside var{ vvv } you must put in the brackets[]
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);

      // Console log for debugging
      console.log(request.data.results);
      return request;
    }

    fetchData();
    // Dependency
  }, [fetchUrl]); // If blank, run once when row loads. Never again

  console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      {/* Title */}
      <h2>{title}</h2>

      {/* Container -> Posters */}
      <div className="row__container">
        {/* Row posters */}
        {movies.map((movie) => (
          <img
            /* So that we are efficiently rendering movies */
            key={movie.id}
            onClick={() => handleClick(movie)}
            /* Every row is a row__poster but if it is a large row then it is also row__posterLarge */
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              // If it is a large row then it uses the movie poster, otherwise us the thumbnail
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* When you have a trailer url */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
