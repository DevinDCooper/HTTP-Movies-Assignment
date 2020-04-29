import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies, getMovieList }) {
  useEffect(() => {
    getMovieList()
  }, [getMovieList])
  
  return (
    <div className="movie-list">
      {console.log('render ')}
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
