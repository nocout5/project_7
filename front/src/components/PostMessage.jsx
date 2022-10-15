import React from "react";
import axios from "axios";

export default function PostMessage(props) {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [message, setMessage] = React.useState({
    message: "",
    userId: userData.userId,
    firstName: userData.firstName,
    lastName: userData.lastName,
    date: 0,
  });
  const [file, setFile] = React.useState();

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setMessage((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const message_to_send = message;
    const date = new Date();
    message_to_send.date = date;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("message", JSON.stringify(message_to_send));

    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {},
      body: formData,
    };

    fetch("http://localhost:3000/messages/", requestOptions).then((response) =>
      response.json().then((message_data) => {
        console.log(message_data);
        props.socket.emit("send-message", message_data.infos);
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
      <input type="file" onChange={saveFile} />

      <button>post !</button>
    </form>
  );
}
