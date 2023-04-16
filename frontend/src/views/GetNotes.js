import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Link } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import useAxios from "../utils/useAxios";

const GetNotes = () => {
  const { authTokens } = useContext(AuthContext);
  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/notes');
        setNotes(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (authTokens) {
      fetchData();
    }
  }, [authTokens]);

  const handleNoteClick = (noteId) => {
    history.push(`/notes/${noteId}`);
  };

  return (
    <div className="container mx-auto px-4">
      {showNoteForm ? (
        <NoteForm setNotes={setNotes} />
      ) : (
        <div>
          <div className="flex justify-between items-center my-8">
            <button
              onClick={() => setShowNoteForm(true)}
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Create Note
            </button>
          </div>
          {notes.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note) => (
                <li key={note.id} className="border border-gray-400 rounded-lg overflow-hidden shadow-md">
                  <div onClick={() => handleNoteClick(note.id)} className="block cursor-pointer">
                    <img src={note.cover_image} alt="" className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h2 className="text-lg font-medium text-gray-900">{note.title}</h2>
                      <p className="mt-2 text-gray-600">{note.body.slice(0, 100)}...</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-4 py-3">
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notes found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GetNotes;
