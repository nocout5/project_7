import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "user",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    };

    fetch("http://localhost:3000/auth/signup", requestOptions).then(
      (response) => {
        console.log(response);
        navigate("/login");
      }
    );
  }

  return (
    <div>
      <h1>register page</h1>
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
          placeholder="mot de passe"
          onChange={handleChange}
          name="password"
          value={userData.password}
        />
        <input
          type="text"
          placeholder="prénom"
          onChange={handleChange}
          name="firstName"
          value={userData.firstName}
        />
        <input
          type="text"
          placeholder="nom"
          onChange={handleChange}
          name="lastName"
          value={userData.lastName}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}