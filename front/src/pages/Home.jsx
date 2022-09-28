import React from "react";
import Message from "../components/Message";
import PostMessage from "../components/PostMessage";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <PostMessage socket={socket} />
      <Message socket={socket} />
    </div>
  );
}
