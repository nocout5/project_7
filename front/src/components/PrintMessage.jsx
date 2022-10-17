import React from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import ModifyButton from "./ModifyButton";

export default function Message(props) {
  const [messagesData, setMessageData] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(function () {
    fetch("http://localhost:3000/messages/", {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.status === 401) {
        sessionStorage.removeItem("userData");
        navigate("/login");
      }
      res.json().then((data) => setMessageData(data));
    });
  }, []);

  React.useEffect(() => {
    props.socket.on("message-receive", (msg) => {
      setMessageData((prev) => [...prev, msg]);
    });
    props.socket.on("id_to_delete", (id) => {
      setDeleteId((prev) => [...prev, id]);
    });
  }, [props.socket]);

  const deleteButton = (id) => {
    fetch(`http://localhost:3000/messages/${id}`, {
      method: "DELETE",
      credentials: "include",
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
            <div>
              {message.firstName} {message.lastName} {message.date}
              <button onClick={() => deleteButton(message._id)}>
                supprimer
              </button>
              <LikeButton socket={props.socket} message={message} />
              <ModifyButton />
            </div>
            {message.imageUrl && <img src={message.imageUrl} alt="pic" />}
            <h3>{message.message}</h3>
          </div>
        )}
      </div>
    );
  });
}
