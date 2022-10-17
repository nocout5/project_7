import React from "react";
import { useNavigate } from "react-router-dom";
import Register from "../components/Register";
import styled from "styled-components";
import colors from "../style/color";

const LogContainer = styled.div`
  background-color: ${colors.tertiary};
  overflow: hidden;
  border-radius: 15px;
  width: 350px;
  height: 550px;
  margin: auto;
  position: relative;
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
    background-size: 500px;
    background-image: url("https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bf884ad570b50659c5fa2dc2cfb20ecf&auto=format&fit=crop&w=1000&q=100");
  }

  .log_in {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    width: 65%;
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
      font-size: 1em;
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
    font-size: 1.7em;
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
      height: 40px;
      line-height: 30px;
      padding: 8px 15px;
      border-bottom: 1px solid #eee;
      width: 100%;
      font-size: 16px;

      &:last-child {
        border-bottom: 0;
      }
      &::-webkit-input-placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  .submit-btn {
    background-color: rgba(0, 0, 0, 0.4);
    color: rgba(256, 256, 256, 0.7);
    border: 0;
    border-radius: 15px;
    display: block;
    margin: 15px auto;
    padding: 15px 45px;
    width: 100%;
    font-size: 13px;
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
        font-size: 1.7em;
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
          height: 30px;
          line-height: 30px;
          padding: 8px 15px;
          border-bottom: 1px solid #eee;
          width: 100%;
          font-size: 12px;

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
        font-size: 13px;
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
      font-size: 1em;
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
          <span>or</span>Log in
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
              placeholder="password"
              onChange={handleChange}
              name="password"
              value={userData.password}
            />
          </div>
          <div>
            <button className="submit-btn">Log in</button>
          </div>
        </form>
      </div>
      <Register state={slideUp} setState={setSlideUp} />
    </LogContainer>
  );
}
