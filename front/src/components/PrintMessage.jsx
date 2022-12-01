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
  LARGE_WIDTH_VALUE,
  DROP_SHADOW,
} from "../style/global_css_value";

const PrintBox = styled.div`
  height: 100%;
  animation: appear 2s forwards;

  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  .post {
    position: relative;
    box-shadow: ${DROP_SHADOW};
    border: hsla(233, 13%, 35%, 0.5) 2px solid;
    padding: 5px;
    background-color: aliceblue;
    animation: slideLeft 800ms ease-out both;
    transition: border 125ms;

    :hover {
      border: hsla(233, 13%, 35%, 1) 2px solid;
    }

    @media (min-width: ${LARGE_DEVICE_VALUE}) {
      width: ${LARGE_WIDTH_VALUE};
      margin: 20px auto;
      border-radius: ${BORDER_RADIUS_VALUE};
    }
  }

  .content {
    margin: 5px;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap-reverse;
  }

  .post_infos {
    font-style: italic;
    font-size: 16px;
  }

  .content_text {
    font-size: 16px;
    width: 80%;
    overflow-wrap: break-word;
    flex-grow: 1;
  }
  .content_img {
    align-self: flex-end;
    max-width: 20%;
    height: 100%;
    transition: all 250ms;
    :hover {
      box-shadow: 0 0 5px #388fcd;
    }
    :active {
      box-shadow: none;
      max-width: 90%;
    }
  }
  .post_option {
    display: flex;
    justify-content: space-between;
  }

  .delete_button:hover {
    fill: red;
    animation: shake 0.52s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
`;

// récupère tous les éléments de la colection messages de la db,
// affiche tous les message avec leurs option
export default function Message(props) {
  const [messagesData, setMessagesData] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState([]);
  const [updateData, setUpdateData] = React.useState([]);
  const [scrollElmt, setScrollElmt] = React.useState("");

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const navigate = useNavigate();
  let i = 0;

  // envoie la requète pour récupérer tous les messages
  React.useEffect(function () {
    fetch("http://localhost:3000/messages/", {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.status === 401) {
        sessionStorage.removeItem("userData");
        navigate("/login");
      }
      res.json().then((data) => setMessagesData(data.reverse()));
    });
  }, []);

  // écoute les évenement de socket io pour mettre à jour l'affichage en conséquence
  React.useEffect(() => {
    props.socket.on("message-receive", (msg) => {
      // ajoute une variable pour empecher un délai dans l'animation du msg
      msg.aDelay = 0;
      setScrollElmt(msg);
      setMessagesData((prev) => [msg, ...prev]);
    });
    props.socket.on("id_to_delete", (id) => {
      setDeleteId((prev) => [...prev, id]);
    });
    props.socket.on("send_update_message", (data) => {
      setUpdateData((prev) => [...prev, data]);
    });
  }, [props.socket]);

  // scroll sur le message envoyer par l'utilisateur uniquement
  React.useEffect(() => {
    if (scrollElmt && userData.userId === scrollElmt.userId) {
      const element = document.getElementById(scrollElmt._id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [scrollElmt]);

  // envoie une requète pour suprimmer un msg
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

  // variable utilisée pour permettre aux post d'étre toujours visible
  let zValue = 1000;

  return (
    <PrintBox>
      {messagesData.map((message) => {
        let aDelay = "";
        if (message.aDelay === 0) {
          aDelay = `${message.aDelay}s`;
        } else {
          aDelay = `${i * 0.1 + 2}s`;
        }

        i++;
        if (updateData) {
          // parcours la liste des msg modifiées pour remplacer la liste initial
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
            id={message._id}
            key={message._id}
            style={{ zIndex: --zValue, animationDelay: aDelay }}
          >
            <div key={message._id}>
              <div>
                <p className="post_infos">
                  {message.firstName} {message.lastName}
                  {message.mod && <span> modifié </span>}
                  &#160;
                  <span title={date.toLocaleString()}>
                    {new Date().toLocaleDateString() ===
                    date.toLocaleDateString()
                      ? `à ${date.toLocaleTimeString()}`
                      : `le ${date.toLocaleDateString()}`}
                  </span>
                </p>
                <div className="content">
                  <p className="content_text">{message.message}</p>
                  {message.imageUrl && (
                    <img
                      className="content_img"
                      src={message.imageUrl}
                      alt="pic"
                    />
                  )}
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
