import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";


export default function Movie(props){
  const [movie, setMovie] = useState({
    id:'',
    directer:'',
    title:'',
    stars:[],
    metascore:''
  })

  useEffect(()=>{
     axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  },[props.match.params.id])

  const saveMovie = () =>{
    const addToSavedList = props.addToSavedList;
    addToSavedList(movie);
  }

  const editMovie = () =>{
    props.history.push(`/edit/${props.match.params.id}`)
  }

  const deleteMovie = () =>{
    axios
    .delete(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
    .then((res)=> props.history.push('/'))
    .catch((err)=> console.log(err))
  }

  return(
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="edit-button" onClick={editMovie}>
        Edit
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>

    </div>
    )
}