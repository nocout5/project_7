import React from "react";
import PrintMessage from "../components/PrintMessage";
import PostMessage from "../components/PostMessage";
import io from "socket.io-client";
import styled from "styled-components";
import {
  LARGE_DEVICE_VALUE,
  BORDER_RADIUS_VALUE,
} from "../style/global_css_value";

const socket = io.connect("http://localhost:3000");

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 92vh;
  .print_area {
    background-color: red;
  }
  @media (min-width: ${LARGE_DEVICE_VALUE}) {
    border-radius: 0 0 ${BORDER_RADIUS_VALUE} ${BORDER_RADIUS_VALUE};
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
