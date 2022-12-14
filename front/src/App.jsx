import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import Header from "./components/Header.jsx";
import { createGlobalStyle } from "styled-components";
import { BORDER_RADIUS_VALUE, COLORS } from "./style/global_css_value.js";

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  box-sizing: border-box;
}

body, html{
  background-color: #dbdce7;
  /* user-select: none; */
  min-height: 100vh;
  font-family: 'Lato', sans-serif;
  overflow: hidden;
  ::-webkit-scrollbar {
    display: none;
  }


}

.wrap{
  height: 100vh;
  display: flex;
  flex-direction: column;

}

h2{
  font-size: 30px;
}

body, button, input, textarea{
  font-family: 'Lato', sans-serif;

  font-size: 20px;
}

textarea {
    border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/
}

a{
  color: black;
  text-decoration: none;
}

form{
  transition: opacity 250ms;
}

button, label{
  cursor: pointer;
  padding: 0;
  border-radius: ${BORDER_RADIUS_VALUE};
  border: 0;
  fill: ${COLORS.tertiary};
  background-color: transparent;
  transition: opacity 250ms;

  svg{
    width: 24px;
    height: 24px;
  }

}


@keyframes inAnimation {
    0% {
      opacity: 0;
      visibility: hidden;
    }
    100% {
      opacity: 1;
      visibility: visible;
    }
  }

  @keyframes outAnimation {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(1px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-1px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(1px, 0, 0);
  }
}
@keyframes slideLeft {
  0%{
    transform: translateX(-100vw);
  }

  50%{
    transform: translateX(20vw);
  }

  100%{
    transform: translateX(0);
  }
  
}

@keyframes slideTop {
  0%{
    transform: translateY(-100%);
  }

  50%{
    transform: translateY(30%);
  }

  100%{
    transform: translateY(0);
  }
  
}

@keyframes slideRight {
  0%{
    transform: translateX(100vw);
  }

  50%{
    transform: translateX(-30vw);
  }

  100%{
    transform: translateX(0);
  }
  
}
`;

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" exact />
        </Route>
        <Route element={<Login />} path="login" />
      </Routes>
    </BrowserRouter>
  );
}
