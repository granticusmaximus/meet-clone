const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // In production, use your domain
    methods: ["GET", "POST"]
  }
});

const rooms = {};

io.on("connection", socket => {
  socket.on("join room", roomID => {
    if (!rooms[roomID]) rooms[roomID] = [];
    rooms[roomID].push(socket.id);

    const otherUsers = rooms[roomID].filter(id => id !== socket.id);
    socket.emit("all users", otherUsers);

    socket.on("sending signal", payload => {
      io.to(payload.userToSignal).emit("user joined", {
        signal: payload.signal,
        callerID: socket.id
      });
    });

    socket.on("returning signal", payload => {
      io.to(payload.callerID).emit("receiving returned signal", {
        signal: payload.signal,
        id: socket.id
      });
    });

    socket.on("disconnect", () => {
      Object.keys(rooms).forEach(roomID => {
        rooms[roomID] = rooms[roomID].filter(id => id !== socket.id);
      });
    });
  });
});

server.listen(5050, () => console.log("Socket.IO server running on port 5050"));