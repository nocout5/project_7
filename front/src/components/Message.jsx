import React from "react";

export default function Message() {
  const [messagesData, setMessageData] = React.useState([]);
  const token = JSON.parse(localStorage.getItem("userData")).token;

  React.useEffect(function () {
    fetch("http://localhost:3000/messages/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMessageData(data));
  }, []);

  const deleteButton = (event, id) => {
    fetch(`http://localhost:3000/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return messagesData.map((message) => {
    return (
      <div key={message._id}>
        <p>
          {message.firstName} {message.lastName}
          <button onClick={(event) => deleteButton(event, message._id)}>
            supprimer
          </button>
        </p>
        <h3>{message.message}</h3>
      </div>
    );
  });
}
