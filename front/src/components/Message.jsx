import React from "react";

export default function Message(props) {
  const [messagesData, setMessageData] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState([]);
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

  React.useEffect(() => {
    props.socket.on("message-receive", (msg) => {
      setMessageData((prev) => [...prev, msg]);
    });
    props.socket.on("id_to_delete", (id) => {
      setDeleteId((prev) => [...prev, id]);
    });
  }, [props.socket]);

  const deleteButton = (event, id) => {
    fetch(`http://localhost:3000/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data_id) => {
        props.socket.emit("delete_message", data_id);
      });
  };

  return messagesData.map((message) => {
    return (
      <div key={message._id}>
        {deleteId.indexOf(message._id) === -1 && (
          <div key={message._id}>
            <p>
              {message.firstName} {message.lastName} {message.date}
              <button onClick={(event) => deleteButton(event, message._id)}>
                supprimer
              </button>
            </p>
            <h3>{message.message}</h3>
          </div>
        )}
      </div>
    );
  });
}
