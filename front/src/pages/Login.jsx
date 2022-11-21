import React from "react";
import { useNavigate } from "react-router-dom";
import Register from "../components/Register";
import styled from "styled-components";
import { COLORS } from "../style/global_css_value";
import login_background from "../assets/login_back.jpg";
import { BORDER_RADIUS_VALUE } from "../style/global_css_value";
import { LARGE_DEVICE_VALUE } from "../style/global_css_value";

const LogContainer = styled.div`
  background-color: ${COLORS.tertiary};
  overflow: hidden;
  width: 100vw;
  flex-basis: 90vh;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: relative;
  flex-grow: 1;
  @media (min-width: ${LARGE_DEVICE_VALUE}) {
    flex-grow: 0;
    width: 500px;
    flex-basis: 700px;
    border-radius: ${BORDER_RADIUS_VALUE};
  }

  &::after {
    content: "";
    opacity: 0.8;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    background-position: left bottom;
    background-size: cover;
    background-image: url(${login_background});
  }

  .log_in {
    position: absolute;
    top: 40%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    width: 80%;
    z-index: 5;
    -webkit-transition: all 0.3s ease;
    &.slide-up {
      top: 5%;
      -webkit-transform: translate(-50%, 0%);
      -webkit-transition: all 0.3s ease;
    }
    &.slide-up .form-holder,
    &.slide-up .submit-btn {
      opacity: 0;
      visibility: hidden;
    }
    &.slide-up .form-title {
      cursor: pointer;
    }
    &.slide-up .form-title span {
      margin-right: 5px;
      opacity: 1;
      visibility: visible;
      -webkit-transition: all 0.3s ease;
    }
  }
  .form-title {
    color: #fff;
    text-align: center;

    span {
      color: rgba(232, 20, 20, 0.8);
      opacity: 0;
      visibility: hidden;
      -webkit-transition: all 0.3s ease;
    }
  }
  .form-holder {
    border-radius: 15px;
    background-color: #fff;
    overflow: hidden;
    margin-top: 50px;
    opacity: 1;
    visibility: visible;
    -webkit-transition: all 0.3s ease;

    .input {
      border: 0;
      outline: none;
      box-shadow: none;
      display: block;
      height: 60px;
      line-height: 30px;
      padding: 8px 15px;
      border-bottom: 1px solid #eee;
      width: 100%;

      &:last-child {
        border-bottom: 0;
      }
      &::-webkit-input-placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  .submit-btn {
    background-color: rgb(229, 56, 56, 0.4);
    color: rgba(256, 256, 256, 0.7);
    display: block;
    margin: 15px auto;
    padding: 15px 45px;
    width: 100%;
    font-weight: bold;
    cursor: pointer;
    opacity: 1;
    visibility: visible;
    -webkit-transition: all 0.3s ease;

    &:hover {
      transition: all 0.3s ease;
      background-color: rgb(229, 56, 56, 0.9);
      transform: scale(1.1);
    }
  }

  .SignUp {
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 5;
    -webkit-transition: all 0.3s ease;

    &::before {
      content: "";
      position: absolute;
      left: 50%;
      top: -20px;
      -webkit-transform: translate(-50%, 0);
      background-color: #fff;
      width: 200%;
      height: 250px;
      border-radius: 50%;
      z-index: 4;
      -webkit-transition: all 0.3s ease;
    }

    .center {
      position: absolute;
      top: calc(50% - 10%);
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      width: 65%;
      z-index: 5;
      -webkit-transition: all 0.3s ease;

      .form-title {
        color: #000;
        text-align: center;

        span {
          color: rgba(0, 0, 0, 0.4);
          opacity: 0;
          visibility: hidden;
          -webkit-transition: all 0.3s ease;
        }
      }

      .form-holder {
        border-radius: 15px;
        background-color: #fff;
        border: 1px solid #eee;
        overflow: hidden;
        margin-top: 50px;
        opacity: 1;
        visibility: visible;
        -webkit-transition: all 0.3s ease;

        .input {
          border: 0;
          outline: none;
          box-shadow: none;
          display: block;
          line-height: 30px;
          padding: 8px 15px;
          border-bottom: 1px solid #eee;
          width: 100%;

          &:last-child {
            border-bottom: 0;
          }
          &::-webkit-input-placeholder {
            color: rgba(0, 0, 0, 0.4);
          }
        }
      }

      .submit-btn {
        background-color: #6b92a4;
        color: rgba(256, 256, 256, 0.7);
        border: 0;
        border-radius: 15px;
        display: block;
        margin: 15px auto;
        padding: 15px 45px;
        width: 100%;
        font-weight: bold;
        cursor: pointer;
        opacity: 1;
        visibility: visible;
        -webkit-transition: all 0.3s ease;

        &:hover {
          transition: all 0.3s ease;
          background-color: rgba(0, 0, 0, 0.8);
        }
      }
    }

    &.slide-up {
      top: 90%;
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .center {
      top: 10%;
      -webkit-transform: translate(-50%, 0%);
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .form-holder,
    &.slide-up .submit-btn {
      opacity: 0;
      visibility: hidden;
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .form-title {
      margin: 0;
      padding: 0;
      cursor: pointer;
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .form-title span {
      margin-right: 5px;
      opacity: 1;
      visibility: visible;
      -webkit-transition: all 0.3s ease;
    }
  }
`;

export default function Login() {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });
  const [slideUp, setSlideUp] = React.useState(false);
  const navigate = useNavigate();

  const userIsLogged = sessionStorage.getItem("userData");

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    };

    fetch("http://localhost:3000/auth/login", requestOptions).then(
      (response) => {
        if (response.status === 200)
          response.json().then((data) => {
            sessionStorage.setItem("userData", JSON.stringify(data));
            window.location.reload();
          });
      }
    );
  }
  React.useEffect(function () {
    if (userIsLogged) {
      navigate("/");
    }
  }, []);

  function slideLogIn() {
    setSlideUp((current) => !current);
  }

  return (
    <LogContainer>
      <div className={slideUp ? "slide-up log_in" : "log_in"}>
        <h2 onClick={slideLogIn} className="form-title" id="log_in">
          <span>ou</span>Connexion
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-holder">
            <input
              className="input"
              type="text"
              placeholder="email"
              onChange={handleChange}
              name="email"
              value={userData.email}
            />
            <input
              className="input"
              type="text"
              placeholder="mot de passe"
              onChange={handleChange}
              name="password"
              value={userData.password}
            />
          </div>
          <div>
            <button className="submit-btn">Se connecter</button>
          </div>
        </form>
      </div>
      <Register state={slideUp} setState={setSlideUp} />
    </LogContainer>
  );
}
