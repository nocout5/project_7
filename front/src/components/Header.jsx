import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo_earth from "../assets/logo_earth.png";
import logo_text from "../assets/logo_text.png";
import unlog_logo from "../assets/unlog_logo.png";

import {
  LARGE_DEVICE_VALUE,
  BORDER_RADIUS_VALUE,
} from "../style/global_css_value";

const HeaderStyle = styled.header`
  position: relative;
  width: 100vw;
  background-color: #1f4160;
  flex-basis: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${LARGE_DEVICE_VALUE}) {
    width: 500px;
    flex-basis: 100px;
    border-radius: 0 0 ${BORDER_RADIUS_VALUE} ${BORDER_RADIUS_VALUE};
  }

  .unlog_button {
    position: absolute;
    background-image: url(${unlog_logo});
    background-size: cover;
    width: 35px;
    height: 35px;
    right: 20px;
    cursor: pointer;
  }

  .logo_container {
    width: 100%;
    text-align: center;
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
      <div className="logo_container">
        <img src={logo_earth} alt="logo groupomania" />
        <img src={logo_text} alt="logo groupomania" />
      </div>
      {userData && <button className="unlog_button" onClick={unlog}></button>}
    </HeaderStyle>
  );
}
