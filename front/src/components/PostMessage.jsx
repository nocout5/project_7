import React from "react";

export default function PostMessage(props) {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [message, setMessage] = React.useState({
    message: "",
    userId: userData.userId,
    firstName: userData.firstName,
    lastName: userData.lastName,
    date: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setMessage((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const message_to_send = message;
    const date = new Date();
    console.log(date);
    message_to_send.date = date;
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(message_to_send),
    };

    fetch("http://localhost:3000/messages/", requestOptions).then((response) =>
      response.json().then((message_data) => {
        console.log("message send");
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
      <button>post !</button>
    </form>
  );
}
