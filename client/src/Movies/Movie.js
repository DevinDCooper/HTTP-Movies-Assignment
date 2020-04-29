import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";


function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const removeMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then((res) => {
        console.log(res.data)
        // props.updateMovie(res.data);
        push("/");
        // console.log("props.movies", props.movies);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button
        onClick={() => push({
          pathname: `/update-movie/${movie.id}`,
          state: {movie}
        })}
        className="md-button"
      >
        Edit movie
      </button>
      <button
        onClick={removeMovie}
        className="md-button"
      >
        Remove movie
      </button>
    
    </div>
  );
}

export default Movie;
