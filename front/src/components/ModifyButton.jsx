import React from "react";
import { ReactComponent as Update } from "../assets/update.svg";
import styled from "styled-components";
import { ReactComponent as Send } from "../assets/send.svg";
import { ReactComponent as File } from "../assets/file.svg";
import { COLORS } from "../style/global_css_value";

const UpdateStyle = styled.div``;

function ModifyButton(props) {
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const [modRender, setModRender] = React.useState(false);
  const [change, setChange] = React.useState({
    message: "",
    userId: userData.userId,
    firstName: userData.firstName,
    lastName: userData.lastName,
    date: 0,
  });
  const [file, setFile] = React.useState();

  const modifyButton = (id) => {
    return setModRender((prev) => !prev);
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(change);
    const message_to_send = change;
    const date = new Date();
    message_to_send.date = date;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("message", JSON.stringify(message_to_send));

    const requestOptions = {
      method: "PUT",
      credentials: "include",
      headers: {},
      body: formData,
    };

    fetch(
      `http://localhost:3000/messages/${props.message._id}`,
      requestOptions
    ).then((response) =>
      response.json().then((message_data) => {
        props.socket.emit("update_message", message_data);
      })
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setChange((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <UpdateStyle>
      {(props.message.userId === userData.userId ||
        userData.role === "admin") && (
        <button onClick={() => modifyButton(props.message._id, 0)}>
          <Update />
        </button>
      )}
      {modRender && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={props.message.message}
            onChange={handleChange}
            name="message"
            value={change.message}
          />
          <label className="label_file" htmlFor="file_input">
            <File width="25px" />
          </label>
          <input id="file_input" type="file" onChange={saveFile} />

          <button className="send_button">
            <Send fill={COLORS.primary} />
          </button>
        </form>
      )}
    </UpdateStyle>
  );
}

export default ModifyButton;
