import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const base_url = "https://image.tmdb.org/t/p/original";

  const [movie, setMovie] = useState([]);

  /* Once when page loads, get a random movie via async task and load it as the banner */
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        /* rand funciton*/
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return requests;
    }
    fetchData();
  }, []);

  // Debugging
  /* console.log(movie); */

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      /* Background Image */
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            ${base_url}${movie?.backdrop_path}
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* Title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* Div -> Play and my list buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* Description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
