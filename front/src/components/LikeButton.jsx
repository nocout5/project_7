import React from "react";

function LikeButton(props) {
  const [message, setMessage] = React.useState(props.message);
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  let indexLike = message.usersLiked.indexOf(userData.userId);
  let indexDislike = message.usersDisliked.indexOf(userData.userId);

  React.useEffect(() => {
    props.socket.on("like_message_update", (data) => {
      setMessage(data);
    });
  }, [props.socket]);

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
    <div>
      {indexDislike === -1 && indexLike === -1 && (
        <button onClick={() => likeButton(message._id, 1)}>like</button>
      )}
      {indexLike === -1 && indexDislike === -1 && (
        <button onClick={() => likeButton(message._id, -1)}>dislike</button>
      )}
      {indexLike !== -1 && (
        <button onClick={() => likeButton(message._id, 0)}>unlike</button>
      )}
      {indexDislike !== -1 && (
        <button onClick={() => likeButton(message._id, 0)}>undislike</button>
      )}
    </div>
  );
}

export default LikeButton;
