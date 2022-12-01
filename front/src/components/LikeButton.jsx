import React from "react";
import styled from "styled-components";
import { ReactComponent as Upvote } from "../assets/upvote.svg";
import { ReactComponent as Downvote } from "../assets/downvote.svg";
import { COLORS } from "../style/global_css_value";

const LikeButtonStyle = styled.div`
  button {
    animation: inAnimation 1s;
  }

  .arrow_list {
    display: flex;
    justify-content: space-between;
    width: 24px;
  }

  .likes_count {
    font-weight: 700;
  }
`;

// envoie une requète pour modifier le compteur de like dans
// les éléments de la colection messages de la db
function LikeButton(props) {
  const [message, setMessage] = React.useState(props.message);
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  let indexLike = message.usersLiked.indexOf(userData.userId);
  let indexDislike = message.usersDisliked.indexOf(userData.userId);

  // écoute les événements de socket io pour un afficchage des likes,
  // sans recharger la page
  React.useEffect(() => {
    props.socket.on("like_message_update", (data) => {
      if (message._id === data._id) {
        setMessage(data);
      }
    });
  }, [props.socket]);

  // envoie la requète
  const likeButton = (id, like) => {
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ like: like }),
    };
    fetch(`http://localhost:3000/messages/${id}/like`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        props.socket.emit("like_message", data);
      });
  };
  return (
    <LikeButtonStyle>
      <div className="arrow_list">
        <div className="likes_count">{message.likes - message.dislikes}</div>

        {indexDislike === -1 && indexLike === -1 && (
          <button onClick={() => likeButton(message._id, 1)}>
            <Upvote />
          </button>
        )}
        {indexLike === -1 && indexDislike === -1 && (
          <button onClick={() => likeButton(message._id, -1)}>
            <Downvote />
          </button>
        )}
        {indexLike !== -1 && (
          <button onClick={() => likeButton(message._id, 0)}>
            <Upvote fill="#FD2D01" />
          </button>
        )}
        {indexDislike !== -1 && (
          <button onClick={() => likeButton(message._id, 0)}>
            <Downvote fill="#FD2D01" />
          </button>
        )}
      </div>
    </LikeButtonStyle>
  );
}

export default LikeButton;
