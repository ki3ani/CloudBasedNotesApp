import React, { useState, useEffect } from "react";
import axios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const { accessToken } = React.useContext(AuthContext);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await axios.get("/notes", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setNotes(res.data);
    };
    fetchNotes();
  }, [accessToken]);

  return (
    <div>
      <h1>All Notes</h1>
      {notes.map((note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.body}</p>
          {note.cover_image && (
            <img src={note.cover_image} alt="Note cover" />
          )}
          <p>Updated: {note.updated}</p>
          <p>Created: {note.created}</p>
        </div>
      ))}
    </div>
  );
};

export default Notes;
