import React from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import ModifyButton from "./ModifyButton";

export default function Message(props) {
  const [messagesData, setMessagesData] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState([]);
  const [updateData, setUpdateData] = React.useState([]);

  const userData = JSON.parse(sessionStorage.getItem("userData"));

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
      res.json().then((data) => setMessagesData(data));
    });
  }, []);

  React.useEffect(() => {
    props.socket.on("message-receive", (msg) => {
      setMessagesData((prev) => [...prev, msg]);
    });
    props.socket.on("id_to_delete", (id) => {
      setDeleteId((prev) => [...prev, id]);
    });
    props.socket.on("send_update_message", (data) => {
      setUpdateData((prev) => [...prev, data]);
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
    if (updateData) {
      updateData.map((obj) => {
        if (obj._id === message._id) {
          message = obj;
        }
        return obj;
      });
    }

    return (
      <div key={message._id}>
        {deleteId.indexOf(message._id) === -1 && (
          <div key={message._id}>
            <div>
              {message.firstName} {message.lastName} {message.date}
              {(message.userId === userData.userId ||
        userData.role === "admin") &&
                <button onClick={() => deleteButton(message._id)}>
                  supprimer
                </button>
              }
              <LikeButton socket={props.socket} message={message} />
              <ModifyButton message={message} socket={props.socket} />
            </div>
            {message.imageUrl && <img src={message.imageUrl} alt="pic" />}
            <h3>{message.message}</h3>
          </div>
        )}
      </div>
    );
  });
}
