import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../style/global_css_value";
import { ReactComponent as LogoText } from "../assets/logo_text.svg";
import { ReactComponent as LogoEarth } from "../assets/logo_earth.svg";
import { ReactComponent as Logout } from "../assets/logout.svg";
import {
  LARGE_DEVICE_VALUE,
  BORDER_RADIUS_VALUE,
} from "../style/global_css_value";

const HeaderStyle = styled.header`
  animation: slideTop 800ms both;
  position: relative;
  width: 100vw;
  background-color: #1f4160;
  height: 8vh;
  display: flex;
  align-items: center;
  margin: 0 auto;

  @media (min-width: ${LARGE_DEVICE_VALUE}) {
    width: 500px;
    border-radius: 0 0 ${BORDER_RADIUS_VALUE} ${BORDER_RADIUS_VALUE};
  }

  .unlog_button {
    position: absolute;
    background-image: url();
    background-size: cover;
    width: 35px;
    height: 35px;
    right: 20px;

    #Vector {
      transform: translateX(100px);
      transition: transform 250ms;
    }
    :hover #Vector {
      transform: translateX(-40px);
    }
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
        <LogoEarth fill={COLORS.secondary} />
        {!userData && <LogoText fill={COLORS.primary} />}
      </div>
      {userData && (
        <button className="unlog_button" onClick={unlog}>
          <Logout fill="red" />
        </button>
      )}
    </HeaderStyle>
  );
}
