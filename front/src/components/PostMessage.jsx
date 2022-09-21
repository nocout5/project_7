import React from "react";

export default function PostMessage() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [message, setMessage] = React.useState({
    message: "",
    userId: userData.userId,
    firstName: userData.firstName,
    lastName: userData.lastName,
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setMessage((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify(message),
    };

    fetch("http://localhost:3000/messages/", requestOptions).then((response) =>
      response.json().then((data) => {
        console.log(data);
      })
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="type your message"
        onChange={handleChange}
        name="message"
        value={message.message}
      />
      <button>post !</button>
    </form>
  );
}
