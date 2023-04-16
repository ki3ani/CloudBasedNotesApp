import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const axios = useAxios();
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('notes/mynotes');
        setNotes(res.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (authTokens) {
      fetchData();
    }
  }, [authTokens]);

  return (
    <div>
      <h1>My Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <img src={note.cover_image} alt={note.title} />
            <p>{note.body}</p>
            <p>Created: {note.created}</p>
            <p>Updated: {note.updated}</p>
            <p>Public: {note.is_public ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyNotes;
