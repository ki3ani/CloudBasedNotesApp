import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const { authTokens } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const history = useHistory();

  useEffect(() => {
    // Make a GET request to fetch the user's profile information
    axiosInstance
      .get("/profile/")
      .then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
        setBio(response.data.bio);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [axiosInstance]);

  const handleEditClick = () => {
    history.push("/update");
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <button onClick={handleEditClick}>Edit Profile</button>
      <div>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Bio: {bio}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
