import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <nav className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">App Name</h1>
        <div>
          {user ? (
            <>
              <Link to="/" className="mx-4 text-white hover:text-gray-200">Home</Link>
              <Link to="/protected" className="mx-4 text-white hover:text-gray-200">Protected Page</Link>
              <Link to="/notes" className="mx-4 text-white hover:text-gray-200">Notes</Link>
              <Link to="/profile" className="mx-4 text-white hover:text-gray-200">Profile</Link>
              <Link to={`/notes/${user.id}`} className="mx-4 text-white hover:text-gray-200">My Notes</Link>
              <button onClick={logoutUser} className="bg-white text-blue-500 py-2 px-4 rounded-lg hover:bg-gray-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mx-4 text-white hover:text-gray-200">Login</Link>
              <Link to="/register" className="mx-4 text-white hover:text-gray-200">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
