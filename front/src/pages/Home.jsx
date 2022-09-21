import React from "react";
import Message from "../components/Message";
import PostMessage from "../components/PostMessage";

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <PostMessage />
      <Message />
    </div>
  );
}
