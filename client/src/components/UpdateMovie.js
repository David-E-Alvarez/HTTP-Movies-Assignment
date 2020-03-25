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
    console.log("props:", props);
    const { id } = useParams();
    const { push } = useHistory();
    return(
        <div>
            <h1>UpdateMovie.js</h1>
            <form>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                />
                <input
                    type="text"
                    name="director"
                    placeholder="director"
                />
                <input
                    type="text"
                    name="metascore"
                    placeholder="metascore"
                />
                 <input
                    type="text"
                    name="description"
                    placeholder="description"
                />
                <input
                    type="text"
                    name="stars"
                    placeholder="stars"
                />
            </form>
        </div>
    );
}

export default UpdateMovie;