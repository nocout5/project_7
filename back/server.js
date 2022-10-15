const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const messagesRoutes = require("./routes/messages");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "DELETE"],
  },
});

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://jean_OC:OC_password@cluster0.m3gusco.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  next();
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("send-message", (data) => {
    io.emit("message-receive", data);
  });
  socket.on("delete_message", (data) => {
    io.emit("id_to_delete", data);
  });
  socket.on("like_message", (data) => {
    io.emit("like_message_update", data.infos);
  });
});

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

app.use("/auth", userRoutes);
app.use("/messages", messagesRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

server.listen(port);
