import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";



function UpdateMovie(props) {
  const initialMovie = [
    {
      id: 0,
      title: "",
      director: "",
      metascore: "",
      stars: [],
    },
  ];

  const [movie, setMovie] = useState(initialMovie);
  const match = useLocation();
  console.log(match)
  
  useEffect(() => {
    setMovie((state)=>{
    if(match.state){
      return match.state.movie
    } return state 
    })
    console.log(props.movies)

    
  }, []);


  const handleChanges = (e) => {
    if(e.target.name === "stars"){
      setMovie({
        ...movie,
        stars:e.target.value.split(',')
      
      })
    }
    else {
      setMovie({
        ...movie,
        [e.target.name]: e.target.value,
      });
    }
  };


  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then((res) => {
        console.log(res.data)
        // props.updateMovie(res.data);
        props.history.push("/");
        // console.log("props.movies", props.movies);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <label> Title</label>
      <input
        type="text"
        name="title"
        value={movie.title}
        placeholder="name"
        onChange={handleChanges}
      />
      <label> Director</label>
      <input
        type="text"
        name="director"
        value={movie.director}
        placeholder="director"
        onChange={handleChanges}
      />
      
      <label> Metascore</label>
      <input
        type="text"
        name="metascore"
        value={movie.metascore}
        placeholder="metascore"
        onChange={handleChanges}
      />
      <label> Stars: </label>
      <input
        type="text"
        name="stars"
        value={movie.stars}
        placeholder="Stars"
        onChange={handleChanges}
      />
      <br></br>
      <button> Update</button>
    </form>
  );
}
export default UpdateMovie;