import React, { useState, useEffect, useCallback } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const Profile = () => {
  const { authTokens, setAuthTokens } = React.useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    bio: "",
    cover_photo: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = useCallback(async () => {
    try {
      const response = await axios.put(
        "http://localhost:8000/api/profile/",
        formValues,
        { headers: { Authorization: `Bearer ${authTokens.access}` } }
      );
      setProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }, [formValues, authTokens]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: { Authorization: `Bearer ${authTokens.access}` }
        });
        setProfile(response.data);
      } catch (error) {
        if (error.response.status === 401 && authTokens.refresh) {
          try {
            const user = jwt_decode(authTokens.access);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            if (isExpired) {
              const response = await axios.post(
                "http://localhost:8000/api/token/refresh/",
                { refresh: authTokens.refresh }
              );
              const newAuthTokens = {
                access: response.data.access,
                refresh: authTokens.refresh
              };
              localStorage.setItem("authTokens", JSON.stringify(newAuthTokens));
              setAuthTokens(newAuthTokens);
              const newResponse = await axios.get("http://localhost:8000/api/profile", {
                headers: { Authorization: `Bearer ${newAuthTokens.access}` }
              });
              setProfile(newResponse.data);
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    };
    fetchProfile();
  }, [authTokens, setAuthTokens]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormValues({
      username: profile.username,
      email: profile.email,
      bio: profile.bio,
      cover_photo: profile.cover_photo
    });
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Profile</h1>
      {isEditing ? (
        <form onSubmit={handleUpdateProfile}>
          <label>
            Username:
            <input
              type="text"
              name
              value={formValues.username}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name
              value={formValues.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Bio:
            <input
              type="text"
              name
              value={formValues.bio}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Cover Photo:
            <input
              type="text"
              name
              value={formValues.cover_photo}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Update</button>
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <h2>{profile.username}</h2>
          <p>{profile.email}</p>
          <p>{profile.bio}</p>
          <img src={profile.cover_photo} alt="cover" />
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <Link to="/">Home</Link>
    </div>
  );
};

export default Profile;


