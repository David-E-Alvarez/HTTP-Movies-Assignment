import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
    title: "",
    director: "",
    metascore: "",
    description: "",
    stars: []
  };

const UpdateMovie = (props) => {
    console.log("props in UpdateMovie.js:", props);
    const { id } = useParams();
    const { push } = useHistory();
    const[movie, setMovie] = useState(initialItem);

    const handleChange = ev => {
        ev.persist()
        let value = ev.target.value;
        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

    useEffect(() => {
        const movieToUpdate = props.movieList.find(e => `${e.id}` === id);
        if(movieToUpdate){
            setMovie(movieToUpdate);
        }
    }, [props.movieList, id]);

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                props.setMovie(res.data);
                push(`/movies/${id}`);
            })
            .catch(err => console.log(err));
        setMovie({
            title: "",
            director: "",
            metascore: "",
            description: "",
            stars: []
        })
    }


    return(
        <div>
            <h1>UpdateMovie.js</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    placeholder="director"
                    onChange={handleChange}
                    value={movie.director}
                />
                <input
                    type="text"
                    name="metascore"
                    placeholder="metascore"
                    onChange={handleChange}
                    value={movie.metascore}
                />
                 <input
                    type="text"
                    name="description"
                    placeholder="description"
                    onChange={handleChange}
                    value={movie.description}
                />
                <input
                    type="text"
                    name="stars"
                    placeholder="stars"
                    onChange={handleChange}
                    value={movie.stars}
                />
            </form>
        </div>
    );
}

export default UpdateMovie;