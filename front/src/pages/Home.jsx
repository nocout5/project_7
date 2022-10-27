import React from "react";
import PrintMessage from "../components/PrintMessage";
import PostMessage from "../components/PostMessage";
import io from "socket.io-client";
import styled from "styled-components";

const socket = io.connect("http://localhost:3000");

const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  .print_area {
    background-color: red;
  }
`;

export default function Home() {
  return (
    <HomeContainer>
      <PrintMessage socket={socket} />
      <PostMessage socket={socket} />
    </HomeContainer>
  );
}
