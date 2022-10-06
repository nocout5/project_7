import { Link } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [userData, setUserData] = React.useState(
    sessionStorage.getItem("userData")
  );
  const navigate = useNavigate();

  function unlog() {
    sessionStorage.removeItem("userData");
    setUserData();
    navigate("/login");
  }

  return (
    <div>
      <h1>My header</h1>
      <nav>
        {!userData && (
          <Link to="/login" element={<Login />}>
            log in
          </Link>
        )}
        {!userData && (
          <Link to="/register" element={<Register />}>
            inscription
          </Link>
        )}
        {userData && (
          <Link to="/profile" element={<Profile />}>
            User setup
          </Link>
        )}
        {userData && (
          <Link to="/home" element={<Home />}>
            acceuil
          </Link>
        )}

        {userData && <button onClick={unlog}>déconnexion</button>}
      </nav>
    </div>
  );
}
