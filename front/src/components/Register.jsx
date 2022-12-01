import React from "react";
import { useNavigate } from "react-router-dom";

// envoie une requète avec les infos d'un nouvel utilisateur
export default function Register(props) {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "user",
  });

  const navigate = useNavigate();

  // récupère les input value
  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  // envoie la requète
  function handleSubmit(event) {
    event.preventDefault();
    // regex pour la validation de l'email
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email) ===
      false
    ) {
      alert("You have entered an invalid email address!");
      return;
    }
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
        if (response.status === 201) {
          alert("utilisateur créé");
        } else {
          alert("erreur lors de la création de l'utilisateur");
        }
      }
    );
  }

  // switche entre login et register
  function slideSignUp() {
    props.setState((current) => !current);
  }

  return (
    <div className={props.state ? " SignUp" : "SignUp slide-up "}>
      <div className="center">
        <h2 onClick={slideSignUp} className="form-title" id="SignUp">
          <span>ou</span>
          S'inscrire
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
          <button className="submit-btn">Envoyer</button>
        </form>
      </div>
    </div>
  );
}
