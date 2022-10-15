import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
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

  function slideSignUp() {
    props.setState((current) => !current);
  }

  return (
    <div className={props.state ? " SignUp" : "SignUp slide-up "}>
      <div className="center">
        <h2 onClick={slideSignUp} className="form-title" id="SignUp">
          <span>or</span>
          Sign up
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
            <input
              className="input"
              type="text"
              placeholder="prénom"
              onChange={handleChange}
              name="firstName"
              value={userData.firstName}
            />
            <input
              className="input"
              type="text"
              placeholder="nom"
              onChange={handleChange}
              name="lastName"
              value={userData.lastName}
            />
          </div>
          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
