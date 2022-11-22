import React from "react";
import { ReactComponent as Update } from "../assets/update.svg";
import styled from "styled-components";
import { ReactComponent as Send } from "../assets/send.svg";
import { ReactComponent as File } from "../assets/file.svg";
import { COLORS } from "../style/global_css_value";
import {
  LARGE_DEVICE_VALUE,
  BORDER_RADIUS_VALUE,
} from "../style/global_css_value";

const UpdateStyle = styled.div`
  width: fit-content;

  .mod_form {
    padding: 7px;
    background-color: white;
    position: absolute;
    left: 0;
    width: 100%;
    margin-top: 10px;
    opacity: 0;
    z-index: 100;

    @media (min-width: ${LARGE_DEVICE_VALUE}) {
      border-radius: ${BORDER_RADIUS_VALUE};
    }
  }

  .mod_form_on {
    opacity: 1;
  }

  .mod_button_on {
    opacity: 0.5;
  }

  .mod_input {
    border: none;
    outline: 0px none transparent;
  }

  #file_input {
    width: 30px;
    position: absolute;
    left: 0;
    opacity: 0;
  }

  .send_button {
    position: absolute;
    right: 5px;
  }

  .preview_img {
    position: absolute;
    transform: translateY(-100%);
    max-width: 100px;
    opacity: 0.5;
    transition: opacity 250ms;
    :hover {
      opacity: 1;
    }
  }
`;

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
    setModRender((prev) => !prev);
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
        setFile("");
        change.message = "";
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
        <button
          className={modRender ? "mod_button_on" : ""}
          onClick={() => modifyButton(props.message._id, 0)}
        >
          <Update />
        </button>
      )}

      <form
        onSubmit={handleSubmit}
        className={modRender ? "mod_form_on mod_form" : "mod_form"}
      >
        {file && (
          <img
            className="preview_img"
            src={URL.createObjectURL(file)}
            alt="select img"
          />
        )}
        <label className="label" htmlFor="file_input">
          <File width="25px" fill={file ? "red" : ""} />
        </label>
        <input
          id="file_input"
          type="file"
          accept="image/png, image/jpeg"
          onChange={saveFile}
        />
        <input
          className="mod_input"
          type="text"
          placeholder={props.message.message}
          onChange={handleChange}
          name="message"
          value={change.message}
        />

        <button className="send_button">
          <Send fill={COLORS.primary} />
        </button>
      </form>
    </UpdateStyle>
  );
}

export default ModifyButton;
