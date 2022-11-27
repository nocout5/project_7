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
  overflow: hidden;

  .loader_container {
    animation: vanish 4s forwards;
    z-index: 4000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-shrink: 0;
    position: absolute;
  }

  .loader {
    position: relative;
    margin: auto;
    width: 100px;
    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }
  }

  .circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }

  @keyframes color {
    100%,
    0% {
      stroke: red;
    }
    40% {
      stroke: blue;
    }
    66% {
      stroke: green;
    }
    80%,
    90% {
      stroke: yellow;
    }
  }

  @keyframes vanish {
    0% {
      opacity: 1;
    }

    40% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 0;
      z-index: -1;
    }
  }

  @keyframes appear {
    0% {
      opacity: 0;
    }

    80% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

export default function Home() {
  return (
    <HomeContainer>
      <div className="loader_container">
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              className="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>

      <PrintMessage socket={socket} />
      <PostMessage socket={socket} />
    </HomeContainer>
  );
}
