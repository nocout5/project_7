import { Link } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [userData, setUserData] = React.useState(
    localStorage.getItem("userData")
  );
  const navigate = useNavigate();

  function unlog() {
    localStorage.removeItem("userData");
    setUserData();
    navigate("/login");
  }

  return (
    <div>
      <h1>My header</h1>
      <nav>
        <Link to="/login" element={<Login />}>
          log in
        </Link>
        <Link to="/register" element={<Register />}>
          inscription
        </Link>
        {userData && <button onClick={unlog}>déconnexion</button>}
      </nav>
    </div>
  );
}
