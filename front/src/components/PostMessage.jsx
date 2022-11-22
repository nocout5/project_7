import React from "react";
import styled from "styled-components";
import { COLORS } from "../style/global_css_value";
import { ReactComponent as Send } from "../assets/send.svg";
import { ReactComponent as File } from "../assets/file.svg";

const InputBox = styled.div`
  animation: slideRight 800ms both;
  z-index: 3000;
  width: 100%;
  height: 55px;
  background-color: white;
  position: relative;
  justify-content: flex-end;
  .post_input {
    position: absolute;
    width: 80%;
    height: 80%;
    padding: 7px;
    left: 30px;
    border: 0;
    top: 5px;
    outline: 0px none transparent;
  }

  .label_file {
    position: absolute;
    border: 0;
    color: ${COLORS.tertiary};
    top: 5px;
    left: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  #file_input {
    width: 30px;
    opacity: 0;
  }

  .send_button {
    position: absolute;
    border: 0;
    top: 19px;
    right: 17px;
    background-color: white;
    color: ${COLORS.primary};
  }

  .preview_img {
    position: absolute;
    z-index: 2000;
    transform: translateY(-100%);
    max-width: 90vw;
    max-height: 80vh;
    opacity: 0.5;
    transition: opacity 250ms;
    :hover {
      opacity: 1;
    }
  }
`;

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
        props.socket.emit("send-message", message_data.infos);
        setFile("");
        message.message = "";
      })
    );
  }

  return (
    <InputBox>
      {file && (
        <img
          className="preview_img"
          src={URL.createObjectURL(file)}
          alt="select img"
        />
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          className="post_input"
          type="text"
          placeholder="type your message..."
          onChange={handleChange}
          name="message"
          value={message.message}
        />

        <label className="label_file" htmlFor="file_input">
          <File fill={file ? "red" : ""} />
        </label>
        <input
          id="file_input"
          type="file"
          accept="image/png, image/jpeg"
          onChange={saveFile}
        />

        <button className="send_button">
          <Send fill={COLORS.primary} />
        </button>
      </form>
    </InputBox>
  );
}
