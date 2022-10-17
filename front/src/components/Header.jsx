import { Link } from "react-router-dom";
import Home from "../pages/Home";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../style/color";
import logo_earth from "../assets/logo_earth.png";
import logo_text from "../assets/logo_text.png";

const HeaderStyle = styled.header`
  color: ${colors.primary};
  img {
    background-color: #1f4160;
    border-radius: 14px;
    padding: 5px;
  }
`;

export default function Header() {
  const [userData, setUserData] = React.useState(
    sessionStorage.getItem("userData")
  );
  const navigate = useNavigate();

  function unlog() {
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch("http://localhost:3000/auth/logout", requestOptions).then(
      (response) =>
        response.json().then((response) => {
          console.log(response);
        })
    );
    sessionStorage.removeItem("userData");
    setUserData();
    navigate("/login");
  }

  return (
    <HeaderStyle>
      <img src={logo_earth} alt="logo groupomania" />
      <img src={logo_text} alt="logo groupomania" />
      <nav>
        {userData && (
          <Link to="/" element={<Home />}>
            acceuil
          </Link>
        )}

        {userData && <button onClick={unlog}>déconnexion</button>}
      </nav>
    </HeaderStyle>
  );
}
