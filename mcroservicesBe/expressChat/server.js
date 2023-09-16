const socket = require("socket.io");
require("dotenv").config();
const app = require("./src/app");
const { PORT } = process.env;

const server = app.listen(PORT, () => {
  console.log(`Server start with port ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});

process.on("SIGINT", () => {
  server.close(() => console.log(`exits server express`));
});
