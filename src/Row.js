// Destructuring in the { brackets }
import React, { useState, useEffect } from "react";
// Default import allows for renaming of export variable
import axios from "./axios";
import requests from "./requests";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

/* This is going to be a component for each row of movies */
function Row({ title, fetchUrl, isLargeRow }) {
  /* State, how you write react variables */
  // Empty array of movies
  const [movies, setMovies] = useState([]);

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
    </div>
  );
}

export default Row;
