import React from "react";
import styled from "styled-components";
import { COLORS } from "../style/global_css_value";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const InputBox = styled.div`
  width: 100%;
  height: 55px;
  background-color: white;
  position: absolute;
  bottom: 0;
  .post_input {
    padding: 7px;
    width: 75%;

    position: absolute;
    left: 5%;
    border: 0;
    top: 13px;
    outline: 0px none transparent;
    text-overflow: ellipsis;
  }

  .label_file {
    position: absolute;
    border: 0;
    color: ${COLORS.tertiary};
    left: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  #file_input {
    display: none;
  }

  .send_button {
    position: absolute;
    border: 0;
    top: 19px;
    right: 17px;
    background-color: white;
    color: ${COLORS.primary};
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
        console.log(message_data);
        props.socket.emit("send-message", message_data.infos);
      })
    );
  }

  return (
    <InputBox>
      <form onSubmit={handleSubmit}>
        <input
          className="post_input"
          type="text"
          placeholder="type your message..."
          onChange={handleChange}
          name="message"
          value={message.message}
        />

        <label className="label_file" htmlFor="file_input">
          <FontAwesomeIcon icon={faFile} />
        </label>
        <input id="file_input" type="file" onChange={saveFile} />

        <button className="send_button">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </InputBox>
  );
}
