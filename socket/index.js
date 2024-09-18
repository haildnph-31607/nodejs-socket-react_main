import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
const io = new Server({ cors: "http://localhost:5173" });

let onlineUser = [];

io.on("connection", (socket) => {
    console.log("new connect", socket.id);
  
    socket.on("addNewUser", (userId) => {
      !onlineUser.some((user) => user.userId == userId) &&
        onlineUser.push({
          userId,
          socketId: socket.id,
        });
      console.log("user đang online", onlineUser);
      io.emit("getOnlineUsers", onlineUser);
    });
  
    // Sự kiện gửi tin nhắn
    // socket.on("sendMessage", (message) => {
    //   const user = onlineUser.find((user) => user.userId == message.recipientId);
      
    //   if (user) {
    //     io.to(user.socketId).emit("getMessage", message);
    //   }
    // });
    socket.on("sendMessage", (message) => {
        const user = onlineUser.find((user) => user.userId == message.recipientId);
        
        if (user) {
          io.to(user.socketId).emit("getMessage", message);
        }
      });
    socket.on("disconnect", () => {
      onlineUser = onlineUser.filter((user) => user.socketId != socket.id);
      io.emit("getOnlineUsers", onlineUser);
    });
  });
  io.listen(process.env.PORT);
