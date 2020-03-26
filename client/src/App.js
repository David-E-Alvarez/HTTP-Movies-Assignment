import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from './components/UpdateMovie';
const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data)
        console.log("res.data in App.js", res.data)
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id"
        render={props => 
          <Movie {...props } movieList={movieList} setMovieList={setMovieList} addToSavedList={addToSavedList}/>}
        />

      <Route path="/update-movie/:id">
        <UpdateMovie movieList={movieList} setMovieList={setMovieList}/>
      </Route>
    </>
  );
};

export default App;

//Add a route at the path /update-movie/:id
