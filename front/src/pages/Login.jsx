import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });
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
      navigate("/home");
    }
  }, []);

  return (
    <div>
      <h1>login page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          onChange={handleChange}
          name="email"
          value={userData.email}
        />
        <input
          type="text"
          placeholder="password"
          onChange={handleChange}
          name="password"
          value={userData.password}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
