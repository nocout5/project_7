import React from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import ModifyButton from "./ModifyButton";
import styled from "styled-components";
import { ReactComponent as Delete } from "../assets/delete.svg";
import {
  LARGE_DEVICE_VALUE,
  BORDER_RADIUS_VALUE,
  COLORS,
} from "../style/global_css_value";

const PrintBox = styled.div`
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  .post {
    position: relative;

    border: hsla(233, 13%, 35%, 0.5) 2px solid;
    margin: 20px 0;
    padding: 5px;
    background-color: aliceblue;
    animation: slideLeft 800ms ease-out both;
    transition: border 125ms;

    :hover {
      border: hsla(233, 13%, 35%, 1) 2px solid;
    }

    @media (min-width: ${LARGE_DEVICE_VALUE}) {
      width: 500px;
      margin: 20px auto;
      border-radius: ${BORDER_RADIUS_VALUE};
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    margin: 5px;
  }

  .post_infos {
    font-size: 16px;
  }

  .content_text {
    font-size: 16px;
  }

  .post_option {
    display: flex;
    justify-content: space-between;
  }

  .delete_button:hover {
    fill: red;
    animation: shake 0.52s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  img {
    max-width: 100px;
    height: 100%;
  }
`;

export default function Message(props) {
  const [messagesData, setMessagesData] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState([]);
  const [updateData, setUpdateData] = React.useState([]);

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const navigate = useNavigate();
  let i = 0;

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
      msg.aDelay = 0;
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
  let zValue = 1000;

  return (
    <PrintBox>
      {messagesData.map((message) => {
        let aDelay = "";
        if (message.aDelay === 0) {
          aDelay = `${message.aDelay}s`;
        } else {
          aDelay = `${i * 0.1}s`;
        }

        i++;
        if (updateData) {
          updateData.map((obj) => {
            if (obj._id === message._id) {
              message = obj;
            }
            return obj;
          });
        }
        if (deleteId.indexOf(message._id) !== -1) {
          return;
        }

        let date = new Date(message.date);
        return (
          <div
            className="post"
            key={message._id}
            style={{ zIndex: --zValue, animationDelay: aDelay }}
          >
            <div key={message._id}>
              <div>
                <p className="post_infos">
                  {message.firstName} {message.lastName} le &#160;
                  <span title={date.toLocaleString()}>
                    {new Date().toLocaleDateString() ===
                    date.toLocaleDateString()
                      ? date.toLocaleTimeString()
                      : date.toLocaleDateString()}
                  </span>
                </p>
                <div className="content">
                  <p className="content_text">{message.message}</p>
                  {message.imageUrl && <img src={message.imageUrl} alt="pic" />}
                </div>
                <div className="post_option">
                  <LikeButton socket={props.socket} message={message} />
                  <ModifyButton message={message} socket={props.socket} />
                  {(message.userId === userData.userId ||
                    userData.role === "admin") && (
                    <button
                      className="delete_button"
                      onClick={() => deleteButton(message._id)}
                    >
                      <Delete />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </PrintBox>
  );
}
