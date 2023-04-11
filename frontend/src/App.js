import React from "react";
import "./index.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/Register";
import ProtectedPage from "./views/ProtectedPage";
import Notes from "./views/allNotes";
import MyNotes from "./views/myNotes";
import ProfilePage from "./views/Profile";
import UpdateProfilePage from "./views/updateProfile";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
          <Navbar />
          <Switch>
            <PrivateRoute component={ProtectedPage} path="/protected" exact />
            <PrivateRoute component={Notes} path="/notes" exact />
            <PrivateRoute component={MyNotes} path="/notes/myNotes" exact />
            <PrivateRoute component={ProfilePage} path="/profile" exact />
            <PrivateRoute component={UpdateProfilePage}path="/update" exact />

            

            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={Home} path="/" />
          </Switch>
        </AuthProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
