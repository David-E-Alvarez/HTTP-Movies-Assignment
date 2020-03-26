import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie(props) {
  console.log("props in Movie.js", props);
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data)
      })        
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  

  const routeToUpdateMovie = e => {
    e.preventDefault();
    console.log("routeToUpdateMovie");
    props.history.push(`/update-movie/${movie.id}`)
  }

  
  console.log("movie in Movie.js", movie);
  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick={routeToUpdateMovie}>Update Movie</button>


    </div>
  );
}

export default Movie;

//Add a button in the movie component that routes you to your new route with the movies's id as the URL param
